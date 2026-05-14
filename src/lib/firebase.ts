import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore, collection, doc, getDoc, getDocs, addDoc, updateDoc, deleteDoc, onSnapshot, query, orderBy, getDocFromServer } from 'firebase/firestore';
import firebaseConfig from '../../firebase-applet-config.json';

// Safety check for deployment environments
const hasConfig = firebaseConfig && (firebaseConfig as any).apiKey;

if (!hasConfig) {
  console.warn("Firebase configuration is missing or invalid. Check firebase-applet-config.json");
}

const app = hasConfig ? initializeApp(firebaseConfig) : null;
export const db = (app && hasConfig) ? getFirestore(app, (firebaseConfig as any).firestoreDatabaseId) : null as any;
export const auth = app ? getAuth(app) : null as any;

// Connection test
export async function testConnection() {
  if (!db) return;
  try {
    const docRef = doc(db, 'test', 'connection');
    await getDocFromServer(docRef);
    console.log("Firebase connection established successfully.");
  } catch (error: any) {
    if (error.message?.includes('offline') || error.code === 'unavailable') {
      console.error("Firebase connection failed: Client is offline or Firestore is unreachable.");
    } else {
      console.error("Firebase connection info:", error.message);
    }
  }
}

testConnection();

export enum OperationType {
  CREATE = 'create',
  UPDATE = 'update',
  DELETE = 'delete',
  LIST = 'list',
  GET = 'get',
  WRITE = 'write',
}

interface FirestoreErrorInfo {
  error: string;
  operationType: OperationType;
  path: string | null;
  authInfo: {
    userId?: string | null;
    email?: string | null;
    emailVerified?: boolean | null;
    isAnonymous?: boolean | null;
    tenantId?: string | null;
    providerInfo?: {
      providerId?: string | null;
      email?: string | null;
    }[];
  }
}

export function handleFirestoreError(error: unknown, operationType: OperationType, path: string | null) {
  const errInfo: FirestoreErrorInfo = {
    error: error instanceof Error ? error.message : String(error),
    authInfo: {
      userId: auth.currentUser?.uid,
      email: auth.currentUser?.email,
      emailVerified: auth.currentUser?.emailVerified,
      isAnonymous: auth.currentUser?.isAnonymous,
      tenantId: auth.currentUser?.tenantId,
      providerInfo: auth.currentUser?.providerData?.map(provider => ({
        providerId: provider.providerId,
        email: provider.email,
      })) || []
    },
    operationType,
    path
  }
  console.error('Firestore Error: ', JSON.stringify(errInfo));
  throw new Error(JSON.stringify(errInfo));
}

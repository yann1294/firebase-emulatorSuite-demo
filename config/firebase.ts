/**
 * /**
 *  Firebase configuration
 * 
 *  This config help to setup firebase sdk admin and firebase in the app
 */
import * as admin from 'firebase-admin'

// initialisation de firebase-admin
admin.initializeApp({
//   credential: admin.credential.applicationDefault(),
  projectId: "turntup-959ae",
})

const db = admin.firestore()

  

export { admin,db }


import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import admin from "firebase-admin";
import{db} from '../../../config/firebase'
import UserModel from '../../Models/UserModel'


  

export default class UsersController {

    private dbCollectionReference = db.collection('test-users')

  public UserConverter = {
    toFirestore: function (event) {
      return JSON.parse(JSON.stringify(event))
    },
    fromFirestore: function (snapshot) {
      const data = snapshot.data()
      return new UserModel(snapshot.id,data)
    },
  }

    public async userController({ response }: HttpContextContract) {
        try {
          let users = await admin.auth().listUsers(10);
          console.log(users);
          response.json(users);
        } catch (error) {
          // console.log('error : ', error.message)
          throw new Error(error.message);
        }
      }

      public async index ({response}) {
        let snapshot = await this.dbCollectionReference.get()
        var users: Array<any> = []
        snapshot.forEach((document) => {
          var user = this.UserConverter.fromFirestore(document)
          users.push(user)
        })
    
        if (users.length === 0) {
          return response.json({
            'message' : 'users not found',
          })
        }
        return response.json(users)
      }
    
      public async store ({response, request}: HttpContextContract) {
        var users = request.all()
        // TODO : validation des informations de la request
    
        // ajoute de l'utilisateur dans firestore
        try {
          var doc = this.dbCollectionReference.doc()
          // creation d'un object de type event
          var newUser = new UserModel(doc.id, users)
          // convertion et ajout dans firestore
          doc.withConverter(this.UserConverter)
            .set(newUser)
          return response.json(newUser)
        } catch (error) {
          return response.status(500).json({ 'message': error.message })
        }
      }

      public async destroy ({params, response}) {
        try {
          var doc = this.dbCollectionReference.doc(params.id)
          var message
          var status
          // convertion et ajout dans firestore
          await doc.delete().then(() => {
            message = 'L\'utilisateur a été supprimé'
            status = 200
          }).catch((error) => {
            message = error
            status = 500
          })
          return response.status(status).json({'message': message})
        } catch (error) {
          return response.status(500).json({ 'message': error.message })
        }
      }
    
    

    
}

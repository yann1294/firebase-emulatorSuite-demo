export default class UserModel{
    public id : string
  public userUid: string
  public name: string
  public email: string
 
  constructor(id:any,data:any){
    this.id = id
    this.userUid = data['userUid']
    this.name = data['name']
    this.email = data['email']
  }
  public eventFormJson = (event: any) => event
}
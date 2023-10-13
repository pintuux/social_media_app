export default class PostModel{
    constructor(postId,imageurl){
        this.postId = postId;
        this.imageurl = imageurl
    }
    static  createPost(imageUrl){
        const key = this.generateRandomKey(32);
        // console.log(key)
        const post  = new PostModel(key,imageUrl);
        return post;

    }
    static generateRandomKey(length) {
        const characters = '0123456789abcdefghijklmnopqrstuvwxyz';
      
        let result = '';
        const charactersLength = characters.length;
        for (let i = 0; i < length; i++) {
          const randomIndex = Math.floor(Math.random() * charactersLength);
          result += characters.charAt(randomIndex);
        }
      
        return result;
      }
      
      
      
}

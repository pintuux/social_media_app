export default class CommentModel{
    constructor(commentId,comment){
        this.commentId = commentId;
        this.comment = comment;
    }
    static createComment(comment){
        const commentId = this.generateRandomKey(32);
        const readyComment = new CommentModel(commentId,comment);
        return readyComment;

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
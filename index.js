//import {hello} from "./reduxStore/store";

import store from "./reduxStore";
import { addComment,addPost,removeCommentById,addUpVote,addDownVote,removeCommentByUserId} from "./reduxStore/posts";

store.subscribe(()=>console.log(store.getState()));

store.dispatch(addPost(1,"Post1"));
store.dispatch(addComment(1,1,1,"Merhaba Comment 1"));
store.dispatch(addComment(1,2,3,"Merhaba Comment 2"));

//  store.getState().posts.map(post=>{
//      console.log(post.comments)
//  })
 store.dispatch(removeCommentByUserId(1,3))

 store.getState().posts.map(post=>{
    console.log(post.comments)
})

 //store.dispatch(removeCommentById(1,2));
// store.dispatch(addUpVote(1))
// store.dispatch(addDownVote(1))



//console.log(store.getState().posts[0].votes);


 
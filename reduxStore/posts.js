//ADD_POST, REMOVE_POST(id), UPDATE_POST(id, title), 
//ADD_COMMENT(id, userId, comment), REMOVE_COMMENT(id), REMOVE_USER_COMMENTS(userId), ADD_UP_VOTE(id), ADD_DOWN_VOTE

//ACTION TYPES
const ADD_POST = "ADD_POST";
const REMOVE_POST = "REMOVE_POST";
const UPDATE_POST = "UPDATE_POST";
const ADD_COMMENT="ADD_COMMENT";
const REMOVE_COMMENT="REMOVE_COMMENT";
const REMOVE_USER_COMMENT="REMOVE_USER_COMMENT";
const ADD_UP_VOTE="ADD_UP_VOTE";
const ADD_DOWN_VOTE="ADD_DOWN_VOTE";

//ACTION CREATORS
export const addPost=(id,title)=>({
    type:ADD_POST,
    payload:{id,title,comments:[],votes:{up:0,down:0}}
});

export const removePost=(id)=>({
    type:REMOVE_POST,
    payload:id
});

export const updatePost=(id,title)=>({
    type:UPDATE_POST,
    payload:{id,title}
});

export const addComment=(id,commentId,userId,comment)=>({
    type:ADD_COMMENT,
    payload:{id,commentId,userId,comment}
});

export const removeCommentById=(postId,commentId)=>({
    type:REMOVE_COMMENT,
    payload:{postId,commentId}
});

export const removeCommentByUserId=(postId,userId)=>({
    type:REMOVE_USER_COMMENT,
    payload:{postId,userId}
})

export const addUpVote=(id)=>({
    type:ADD_UP_VOTE,
    payload:id
});
export const addDownVote=(id)=>({
    type:ADD_DOWN_VOTE,
    payload:id
});
 
const postReducer=(posts=[],action)=>{
    switch(action.type){

        case ADD_POST:
            return [...posts,action.payload];

        case REMOVE_POST:
            return posts.filter(item=>item.id!==action);

            case UPDATE_POST:
                return posts.map(item=>{
                    if(item.id===action.payload.id){
                        return {...item,title:action.payload.title}
                    }
                    return item;
                });
            case ADD_COMMENT:
                return posts.map(item=>{
                    if(item.id===action.payload.id && item.comments.length>0){
                        return {...item,comments:[...item.comments,{commentId:action.payload.commentId,userId:action.payload.userId,comment:action.payload.comment}]}
                    }
                    else if(item.id===action.payload.id){
                        return {...item,comments:[{commentId:action.payload.commentId,userId:action.payload.userId,comment:action.payload.comment}]}
                    }
                    return item
                })
            case REMOVE_COMMENT:
                return posts.map(item=>{
                    if(item.id===action.payload.postId){
                        item.comments= item.comments.filter(comment=>comment.commentId!==action.payload.commentId);
                        
                    }
                    return item;
                })

                case REMOVE_USER_COMMENT:
                    return posts.map(item=>{
                        if(item.id===action.payload.postId){
                            item.comments= item.comments.filter(comment=>comment.userId!==action.payload.userId);
                        }
                        return item;
                    })

        case ADD_UP_VOTE:
            return posts.map(item=>{
                if(item.id===action.payload){
                    return {...item,votes:{...item.votes,up:item.votes.up+1}}
                }
                return item;
            })

        case ADD_DOWN_VOTE:
            return posts.map(item=>{
                if(item.id===action.payload){
                    return {...item,votes:{...item.votes,down:item.votes.down-1}}
                }
                return item;
            })


        default: return posts;
    }
};

export default postReducer;
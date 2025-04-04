
const adminAuth=(req,res)=>{
    console.log('admin auth is getting checked');
 const key='sgsgjg'
 const isAdminAuthorized=key=='sig'
 if(!isAdminAuthorized){
    res.status(401).send("Unauthorized request")
 }else{
    next()
 }
}

module.exports={
    adminAuth,
}














//  const adminAuth=(req,res,next)=>{
//     console.log('admin auth is getting checked');
//     //Logic of checking if the request is authorized
//     const token='xyz'
//     const isAdminAuthorized=token=='xyz'
//     if(!isAdminAuthorized){
//         res.status(401).send("Unauthorized request")
        
//     }else{
//         next()
//     }
// };
// const userAuth=(req,res,next)=>{
//     console.log('admin auth is getting checked');
//     //Logic of checking if the request is authorized
//     const token='xyabcz'
//     const isAdminAuthorized=token=='xyz'
//     if(!isAdminAuthorized){
//         res.status(401).send("Unauthorized request")
        
//     }else{
//         next()
//     }
// };


// module.exports={
//     adminAuth,userAuth
// }
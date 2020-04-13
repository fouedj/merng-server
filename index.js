const {ApolloServer,PubSub}=require('apollo-server');
const typeDefs=require('./graphql/typeDefs')
const mongoose =require('mongoose');
const resolvers=require('./graphql/resolvers')
require('dotenv').config();
 
const pubsub=new PubSub()
const PORT = process.env.PORT || 5000
const server =new ApolloServer({
    typeDefs,
    resolvers,
    context:({req})=>({req,pubsub})}
    );
    const uri = process.env.ATLAS_URI;
mongoose.connect(uri,{useNewUrlParser:true,useCreateIndex:true,useUnifiedTopology: true})
const connection=mongoose.connection;
connection.once('open', () => {
  console.log("connection is established!!");
})
    server.listen({port:PORT})
    .then(res=>{
       console.log(`Server is running at ${res.url}`) 
    })
    .catch(err=>{
      console.error(err)
    })
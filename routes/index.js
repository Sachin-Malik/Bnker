const express = require('express');
const router =express.Router();

require('dotenv').config()
const User = require('../models/users');
const Transaction = require('../models/transaction');


 
router.get('/', async (req,res)=>{
  
    var transactions;
    await Transaction.find({},(err,alltransactions)=>{
        if(!err)
        transactions=alltransactions;
        transactions.reverse();
        res.render('home',{
            transArray:transactions
        });
    })
  
})

router.get('/users',async (req,res)=>{
    
    await User.find({},(err,foundusers)=>{
        var foundUsers=foundusers;
        if(foundUsers.length===0)
        {
            res.render('users');
        }
        else
        {
        res.render('users',{
        users:foundUsers
         });
        }    
})
});
router.get('/:email',async (req,res)=>{

    var userEmail=req.params.email;
    var allUsers;
   await User.findOne({email:userEmail},async (err,user)=>{
        if(!err){ 
            const userDetail=user
            await User.find({}, async (err,allusers)=>{
                if(!err){
                    allUsers=allusers
                 res.render('user',{
                     userDetail:userDetail,
                     users:allUsers
                 })
                }
                else{
                    res.render('error');
                }
            })
        }
        else res.render('error');
    })
  
})

router.post('/transaction',async (req,res)=>{
   console.log(req.body);
   var To=req.body.to;
   var From=req.body.from;
   var Amount=Number(req.body.amount);
   var transaction;

   await User.updateOne({username:To},{$inc:{balance:Amount}});
   await User.updateOne({username:From},{$inc:{balance:-Amount}});

   new Transaction({
    from:From,
    to:To,
    amount:Amount
   }).save();
   await Transaction.find({},(err,alltransactions)=>{
      if(!err)
      {
          transaction=alltransactions;
          transaction.reverse();
          res.render('home',{
              transArray:transaction
          })
      }
   });
  
})

module.exports = router;
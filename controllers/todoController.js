const pool = require("../config/db.js");


// Create 
exports.createTodo = async(req,res) =>{
try {
    const {title} = req.body;
    const [result] = await pool.execute("INSERT INTO todos (title) values(?)",[title]);
    res.status(201).json(
        {
            message:"todo Created",
        }
    );
} catch (err) {
    res.status(500).json({error : err.message});
}

};

// Get All todos 
exports.getTodo = async (req,res) => {
    
    try {

        const [rows] = await pool.execute("SELECT * FROM todos");
        res.status(200).json(rows);
        
    } catch (err) {
        res.status(500).json({error : err.message});
    }

}



// Delete Todo 
exports.deleteTodo = async (req,res) => {
    try {
        // params
        const {id} = req.params;

        try {

            const [avaible] = await pool.execute("SELECT * FROM todos WHERE ID = ?",[id]);

            if(avaible.length > 0){
                const [result] = await pool.execute("DELETE FROM todos WHERE id = ?",[id]);
                res.status(200).json({Message : "Todo deleted.."});
            }else{
                res.status(404).json({Error : "Todo not found"});
            }
        } catch (error) {
            res.status(500).json({Error : err.message});
        }

    } catch (err) {
        res.status(500).json({Error : err.message}); 
    }
}




// Update Todo
exports.updateTodo = async(req,res)=>{
        try {
            // Params
            const {id} = req.params;
            const { completed} = req.body;

             try {

                const [avaible] = await pool.execute("SELECT * FROM todos WHERE ID = ?",[id]);

                if(avaible.length > 0){
                    const [result] = await pool.execute("UPDATE todos SET completed = ? WHERE id = ?",[completed,id]);
                    res.status(201).json({Message : "Todo Updated.."});
                }else{
                    res.status(404).json({Error : "Todo not found"});
                }
        } catch (error) {
            res.status(500).json({Error : err.message});
        }



        } catch (error) {
            
        }
}
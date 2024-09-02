import User from "../models/User";

// Read
export const getUser = async(req, res)=>{
    try {
        const {id} = req.params;
        const user = await User.findById(id);
        if(!user){
            return res.status(404).json({message : "User not found"})
        }
        res.status(200).json(user);
    } catch (error) {
        res.status(404).json({message : error.message})
    }
}
export const getUserFriends = async(req, res)=>{
    try {
        const {id} = req.params;
    const user = await User.findById(id);

    const friends = await promise.all(user.friends.map((id)=> User.findById(id)));
    
    const formattedFriends = friends.map(
        ({_id, firstName, lastName, picturepath, occupation, location})=>{
            return {
                _id,
                firstName,
                lastName,
                picturePath,
                occupation,
                location
            }
        }
    );
    res.status(200).json(formattedFriends);

    } catch (error) {
        res.status(404).json({message : error.message})
    }
}

// Update
export const addRemoveFriends = async(req, res)=>{
    try {
        const {id, friendId} = req.params;
        const user = await User.findByIdAndUpdate(id, {$push : {friends : friendId}}, {new : true});
        if(!user){
            return res.status(404).json({message : "User not found"})
        }
        res.status(200).json(user);
    } catch (error) {
        res.status(404).json({message : error.message})
    }
}
// get Profiles list
const getProfiles = (req, res) => {
  res.status(200).json({ data: "Profiles" });
};

// get single profile
const getProfile = async (req,res)=>{
  try {
    
    const {id} = req.params;

    res.status(200).json({status:'success',data:`get profile ${id}`})

  } catch (error) {
    res.status(500).json({status:'error',data:error.message})
  }
}

// update profile
const updateProfile = async (req,res)=>{
  try {
    
    const {id} = req.params;

    res.status(200).json({status:'success',data:`update profile ${id}`})

  } catch (error) {
    res.status(500).json({status:'error',data:error.message})
  }
}

// delete profile
const removeProfile = async (req,res)=>{
  try {
    
    const {id} = req.params;

    res.status(200).json({status:'success',data:`delete profile ${id}`})

  } catch (error) {
    res.status(500).json({status:'error',data:error.message})
  }
}

// create profile
const createProfile = async (req,res)=>{
  try {
    
    const {profile} = req.body;

    res.status(200).json({status:'success',data: `${profile}`})

  } catch (error) {
    res.status(500).json({status:'error',data:error.message})
  }
}

module.exports = {
  getProfiles,getProfile,updateProfile,removeProfile,createProfile
};

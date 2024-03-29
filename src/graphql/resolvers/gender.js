export const gender = async (parent, args) => {
  const { gender } = parent;
  const { shortForm } = args;
  
  if(gender === "F"){
    return shortForm ? "F" : "Female";
  }
  else return shortForm ? "M" : "Male";
};
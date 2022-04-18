import { React, useState, useEffect } from "react";
import Wrapper from "../assets/wrappers/RegisterPage";
import { FormRow,Logo,Alert } from "../components";
import { useAppContext } from "../context/appContext";


const initailState = {
  name: "",
  email: "",
  password: "",
  isMember: true,
};

const Register = () => {
  const [values, setValues] = useState(initailState);
  // global state and usenavigation

  const {isLoading,showAlert,displayAlert}= useAppContext();

  const toggeleMember=()=>{
      setValues({...values,isMember:!values.isMember})
  }

  const handleChange = (e) => {
    setValues({...values,[e.target.name]:e.target.value})
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const{name,password,email,isMember}=values;
    if(!email||!password||(!isMember&&!name)){
      displayAlert();
      return
    }
    console.log(values)
  };
  return (
    <Wrapper className="full-page">
      <form className="form" onSubmit={onSubmit}>
        <Logo />
        <h3>{values.isMember?"Login":"Register"}</h3>
        {
            showAlert && <Alert/>
        }
        {/* name input */}
        {
            !values.isMember &&
            <FormRow type="text" name="name" 
            value={values.name}
            handleChange={handleChange}/>
        }
 

        {/* email input*/}
        <FormRow type="email" name="email" 
        value={values.email}
        handleChange={handleChange}/>

        {/* password input */}
        <FormRow type="password" name="password" 
        value={values.password}
        handleChange={handleChange}/>

        <button type='submit' className='btn btn-block'>
            submit
        </button>
        <p>
            {
                values.isMember?'Not a member yet ?':'Already a member ?'
            }
            <button type="button" onClick={toggeleMember} className="member-btn">{
                values.isMember?'Register':'Login'
            }</button>
        </p>
      </form>
    </Wrapper>
  );
};

export default Register;

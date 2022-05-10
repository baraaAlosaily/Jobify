import React, { useReducer, useContext } from "react";
import axios from "axios";
import App from "../App";
import reducer from "./reducer";
import {
  CLEAR_ALERT,
  DISPLAY_ALERT,
  SETUP_USER_BEGIN,
  SETUP_USER_SUCCESS,
  SETUP_USER_ERROR,
  TOGGLE_SIDE_BAR,
  LOG_OUT_USER,
  UPDATE_USER_BEGIN,
  UPDATE_USER_SUCCESS,
  UPDATE_USER_ERROR,
  HANDLE_CHANGE,
  CLEAR_VALUES,
  CREATE_JOB_BEGIN,
  CREATE_JOB_SUCCESS,
  CREATE_JOB_ERROR,
  GET_JOBS_BEGIN,
  GET_JOBS_SUCCESS
} from "./action";

const addUserToLocalStorage = ({ user, token, location }) => {
  localStorage.setItem("user", JSON.stringify(user));
  localStorage.setItem("token", token);
  localStorage.setItem("location", location);
};

const removeUserFromLocalStorage = () => {
  localStorage.removeItem("user");
  localStorage.removeItem("token");
  localStorage.removeItem("location");
};

const token = localStorage.getItem("token");
const user = localStorage.getItem("user");
const userLocation = localStorage.getItem("location");

const initialState = {
  isLoading: false,
  showAlert: false,
  alertText: "",
  alertType: "",
  user: user ? JSON.parse(user) : null,
  token: token || null,
  userLocation: userLocation || "",
  showSideBar:false,
  isEditing:false,
  editJobId:'',
  position:'',
  company:'',
  jobLocation: userLocation || "",
  jobTypeOption:['full-time','part-time','remote','internship'],
  jobType:'full-time',
  statusOptions:['interview','decline','pending'],
  status:"pending",
  //Get all jobs
  jobs:[],
  totalJobs:0,
  numberOfPages:1,
  pages:1

};

const AppContext = React.createContext();

const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const authFetch= axios.create({
    baseURL:'/api/v1'
  })

  //request 
  
  authFetch.interceptors.request.use((config)=>{
    config.headers.common['Authorization'] = `Bearer ${state.token}`
    return config;
  },(error)=>{
    return Promise.reject(error); 
  })

  //response 

  authFetch.interceptors.response.use((response)=>{
    return response;
  },(error)=>{
    console.log(error.response);
    if(error.response.status===401){
      logoutUser();
      console.log('AUTH ERROR');
    }
    return Promise.reject(error);
  })

  const displayAlert = () => {
    dispatch({ type: DISPLAY_ALERT });
    clearAlert();
  };

  const clearAlert = () => {
    setTimeout(() => {
      dispatch({ type: CLEAR_ALERT });
    }, 3000);
  };

  const setupUser = async ({currentUser,endPoint,alertText}) => {
    dispatch({ type: SETUP_USER_BEGIN });
    try {
      const { data } = await axios.post(`/api/v1/auth/${endPoint}`, currentUser);
      const { user, token, location } = data;
      dispatch({
        type: SETUP_USER_SUCCESS,
        payload: { user, token, location,alertText },
      });
      //local storage later
      addUserToLocalStorage({
        user,
        token,
        location,
      });
    } catch (error) {
      console.log(error.response);
      dispatch({
        type: SETUP_USER_ERROR,
        payload: { msg: error.response.data.msg },
      });
    }
    clearAlert();
  };

  const toggleSideBar=()=>{
    dispatch({type:TOGGLE_SIDE_BAR})
  }
  const logoutUser=()=>{
    dispatch({type:LOG_OUT_USER})
    removeUserFromLocalStorage();
  }

  const updateUser=async(currentUser)=>{
    dispatch({
      type:UPDATE_USER_BEGIN
    })
    try {
      const {data}=await authFetch.patch('/auth/updateUser',currentUser);

      const {user,location,token} =data;

      dispatch({
        type:UPDATE_USER_SUCCESS,payload:{user,location,token}
      });
      addUserToLocalStorage({user,location,token})
    } catch (error) {
      if(error.response.status!==401 ){
        dispatch({type:UPDATE_USER_ERROR,payload:{msg:error.response.data.msg}}) 
      }
    }
    clearAlert(); 
  }

  const handleChange=({name,value})=>{
    dispatch({type:HANDLE_CHANGE,payload:{name,value}});
  }

  const clearValues=()=>{
    dispatch({type:CLEAR_VALUES});
  }

  const createJob=async()=>{
    dispatch({type:CREATE_JOB_BEGIN});
    try {
      const{position,company,jobLocation,jobType,status}=state;
      await authFetch.post('/jobs',{
        position,company,jobLocation,jobType,status
      })
      dispatch({type:CREATE_JOB_SUCCESS});
      dispatch({type:CLEAR_VALUES})
    } catch (error) {
      if(error.response.status===401) return;
      dispatch({type:CREATE_JOB_ERROR,payload:{msg:error.response.data.msg}})
    }
    clearAlert(); 
  }

  const getJobs=async()=>{
    let url='/jobs'
    dispatch({type:GET_JOBS_BEGIN})
    try {
      const {data}=await authFetch(url);
      const{jobs,totalJobs,numberOfPages}=data
      dispatch({type:GET_JOBS_SUCCESS,payload:{
        jobs,
        totalJobs,
        numberOfPages
      }})

    } catch (error) {
      console.log(error.response);
    }
    clearAlert();
  }
  
  const setEditJob=(id)=>{
    console.log(`set edit job :${id}`);
  }
  const deleteJob=(id)=>{
    console.log(`delete job :${id}`);
  }
  
  return (
    <AppContext.Provider
      value={{ ...state, displayAlert,setupUser,toggleSideBar,logoutUser,updateUser,handleChange,clearValues,createJob,getJobs,setEditJob,deleteJob }}
    >
      {children}
    </AppContext.Provider>
  );
};


const useAppContext = () => {
  return useContext(AppContext);
};

export { AppProvider, initialState, useAppContext };

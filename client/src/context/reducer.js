import { CLEAR_ALERT,
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
    } from "./action"
import { initialState } from "./appContext"

const reducer=(state,action)=>{
    if(action.type===DISPLAY_ALERT){
        return {
            ...state,
            showAlert:true,
            alertText:'Please provid all values !',
            alertType:'danger'
        }
    }
    if(action.type===CLEAR_ALERT){
        return {
            ...state,
            showAlert:false,
            alertText:'',
            alertType:''
        }
    }
    if(action.type===SETUP_USER_BEGIN){
        return {
            ...state,isLoading:true
        }
    }
    if(action.type===SETUP_USER_SUCCESS){
        return {
            ...state,
            isLoading:false,
            token:action.payload.token,
            user:action.payload.user,
            userLocation:action.payload.userLocation,
            jobLocation:action.payload.jobLocation,
            showAlert:true,
            alertType:'success',
            alertText:action.payload.alertText
        }
    }
    
    if(action.type===SETUP_USER_ERROR){
        return {
            ...state,
            isLoading:false,
            showAlert:true,
            alertType:'danger',
            alertText: action.payload.msg
        } 
    }
    if(action.type===TOGGLE_SIDE_BAR){
        return {
            ...state,
            showSideBar:!state.showSideBar
        } 
    }
    if(action.type===LOG_OUT_USER){
        return {
            ...initialState,
            user:null,
            token:null,
            userLocation:null,
            jobLocation:null
        } 
    }
    if(action.type===UPDATE_USER_BEGIN){
        return {
            ...state, isLoading:true
        }
    }
    if(action.type===UPDATE_USER_SUCCESS){
        return {
            ...state,
            isLoading:false,
            token:action.payload.token,
            user:action.payload.user,
            userLocation:action.payload.userLocation,
            jobLocation:action.payload.jobLocation,
            showAlert:true,
            alertType:'success',
            alertText:'User Profile Updated'
        }
    }
    
    if(action.type===UPDATE_USER_ERROR){
        return {
            ...state,
            isLoading:false,
            showAlert:true,
            alertType:'danger',
            alertText: action.payload.msg
        } 
    }

    if(action.type===HANDLE_CHANGE){
        return {
            ...state,
            [action.payload.name]:action.payload.value
        } 
    }
    if(action.type===CLEAR_VALUES){
        const initialState={
            isEditing:false,
            editJobId:'',
            position:'',
            company:'',
            jobLocation: state.userLocation,
            jobType:'full-time',
            status:"pending"
        }
        return {
            ...state,
            ...initialState
            // isEditing:false,
            // editJobId:'',
            // position:'',
            // company:'',
            // jobLocation: userLocation,
            // jobType:'full-time',
            // status:"pending"
        } 
    }

    if(action.type===CREATE_JOB_BEGIN){
        return {...state,isLoading:true}
    }

    if(action.type===CREATE_JOB_SUCCESS){
        return {
            ...state,
            isLoading:false,
            showAlert:true,
            alertType:'success',
            alertText: 'New Job Created'
        } 
    }
    if(action.type===CREATE_JOB_ERROR){
        return {
            ...state,
            isLoading:false,
            showAlert:true,
            alertType:'danger',
            alertText: action.payload.msg
        } 
    }

    if(action.type===GET_JOBS_BEGIN){
         return {...state,isLoading:true,showAlert:false}
    }

    if(action.type===GET_JOBS_SUCCESS){
        return {...state,isLoading:false,
            jobs:action.payload.jobs,
            totalJobs:action.payload.totalJobs,
            numberOfPages:action.payload.numberOfPages,
        }
    }

    throw new Error(`no such action :${action.type}`)
}

export default reducer
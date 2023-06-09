import './App.css';
import React from 'react'
import Home from './pages/Home/Home';
import {BrowserRouter,Switch,Route, Redirect} from 'react-router-dom';
import Navigation from './components/shared/Navigation/Navigation';
import Authenticate from './pages/Home/Authenticate/Authenticate';
import Activate from './pages/Home/Activate/Activate';
import Rooms from './pages/Home/Rooms/Rooms';
const isAuth = false;
const user={
    activated:true,
}
function App() {
    return <BrowserRouter basename={process.env.PUBLIC_URL}>
      <Navigation/>
        <Switch>
            <GuestRoute path='/' exact>
                <Home/>
            </GuestRoute>
            <GuestRoute path='/authenticate'>
                <Authenticate/>
            </GuestRoute>
            <SemiProtectedRoute path="/activate">
                <Activate/>
            </SemiProtectedRoute>
            <ProtectedRoute path="/rooms">
                <Rooms/>
            </ProtectedRoute>
        </Switch>
    </BrowserRouter>

}


const GuestRoute = ({children,...rest}) =>{
    return(
        <Route {...rest} 
        render={({location})=>{  
            return isAuth ?  <Redirect to={
                {
                    pathname:'/rooms',
                    state:{from:location},
                }
            }/>
            :
            (
                children
            )
        }}>
        </Route>
    )
}

const SemiProtectedRoute =({children,...rest})=>{
 return(
    <Route {...rest}
    render={({location})=>{
        return (
            !isAuth?(
                <Redirect to={{
                    pathname:'/',
                    state:{from: location}           
                }}/>
            ): isAuth && !user.activated ?
            (children):<Redirect to={{
                pathname:'/rooms',
                state:{from: location}           
            }}/>
        )
    }}></Route>
 )
}

const ProtectedRoute =({children,...rest})=>{
    return(
       <Route {...rest}
       render={({location})=>{
           return (
               !isAuth?(
                   <Redirect to={{
                       pathname:'/',
                       state:{from: location}           
                   }}/>
               ): isAuth && !user.activated ?
               (
                <Redirect to={{
                    pathname:'/activate',
                    state:{from: location}           
                }}/>
               ):(
                children
               )
           )
       }}></Route>
    )
   }

export default App;

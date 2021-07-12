//import axios from 'axios';
//import { response } from 'express';
import React, {useEffect} from 'react';
import { useDispatch } from 'react-redux';
import { auth } from '../_actions/user_action'


export default function (SpecificComponent, option, adminRouter = null){

    // option null-아무나 true-로그인한 유저 false-로그인안한유저

    function AuthenticationCheck(props){

        const dispatch = useDispatch();

        useEffect(() => {

            dispatch(auth()).then(response=>{
                console.log(response)

                // 로그인 하지 않은 상태
                if(!response.payload.isAuth){
                    if(option){
                        props.history.push('/login')
                    }
                } else {
                    // 로그인 한 상태
                    if(adminRouter && !response.payload.isAdmin){
                        props.history.push('/')
                    } else {
                        props.history.push('/')
                    }
                }
            })

        }, [])

        return (
            <SpecificComponent/>
        )
    }
    return AuthenticationCheck
}
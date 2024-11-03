import React, { useEffect, useState } from 'react'
import apiServices,{BASE_URL_IMG} from '../../apiServices'
import { toast } from 'react-toastify'
import { Link, useNavigate } from 'react-router-dom'
import ClipLoader from 'react-spinners/ClipLoader';

export default function AllCity() {
    const [allCity,setAllCity]= useState()
    const navigate= useNavigate()
    const [loading,setLoading]= useState()
    const override={
        "display":"block",
        "margin":"0 auto",
        "position":"absolute",
        "top":"35%",
        "zIndex":"1",  
        }

    useEffect(()=>{
        setTimeout(()=>{
        setLoading(false)
    },1500)
        apiServices.viewAllCity().then(data=>{
            if(data.data.success){
                // console.log(data.data.data)
                setAllCity(data.data.data)
            }
            else{
                toast.error(data.data.message)
            }
        }).catch(err=>{
            console.log(err)
            toast.error("Something Went Wrong")
        })
    },[loading])
    const changeStatus=(id,status)=>{
        setLoading(true)
        if(status==true){
          var upstatus=false
          console.log(upstatus)
         }
         else{
          var upstatus=true
         }
         let data={
           _id:id, 
           city_status: upstatus
         }
         apiServices.changeStatusCity(data).then(data=>{
            setTimeout(()=>{
                setLoading(false)
            },1500)
           if(data.data.success){
            navigate("/admin/allcity")
           }else{
            toast.error(data.data.message)
           }
         }).catch(err=>{
          toast.error("Something went Wrong")
         })  
      }

  return (
    <div>
        <div className="container-fluid p-5">
            <div className="row my-5"></div>
                <div className="row  color-b">
                <div className="d-flex justify-content-center">
          <ClipLoader loading={loading} cssOverride={override} size={120}/>
      </div>
                    <div className="col-md-8 mx-auto">
                    <Link to="/admin/addcity">
                                <button type="" className='btn btn-dark my-2'>Add City</button>
                                </Link>
                        <div class="card color-m" >
                            <div class="card-body">
                                <h5 class="card-title">View Cities</h5>
                                <hr/>
                                
                <table className="table table-bordered">
                    <thead>
                        <tr>
                            <th>Sr.No</th>
                            <th>City Name</th>
                            <th>State Name</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {allCity?.map((el,index)=>(
                            <tr key={index}> 
                                <td>{index+1}</td>
                                <td>{el?.city_name}</td>
                                <td>{el?.state_name}</td>
                                {el?.city_status?<td>Active</td>:<td>In-active</td>}
                                <td style={{width:"300px"}}>
                                <Link to={"/admin/allcity/edit/"+`${el?._id}`}>
                                <button type="submit" className='btn btn-outline-success mx-2'>Update</button>
                                </Link>
                                <button type="submit" className='btn btn-outline-danger mx-2' onClick={()=>{changeStatus(el?._id,el?.city_status)}}>Change Status</button>
                            </td>
                            </tr>
                        ))}  
                        </tbody>
                </table>
                              
                            </div>
                            
                        </div>
                    </div>
                </div>
                
            </div>
    </div>

  )
}

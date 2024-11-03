import { useEffect, useState } from "react"
import apiServices,{BASE_URL_IMG} from "../apiServices"
import {toast} from "react-toastify";
import { Link } from 'react-router-dom'  
import ClipLoader from 'react-spinners/ClipLoader';
export default function Viewlocation() {
    const [viewDestination,setViewDestination]=useState()
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
        apiServices.allDestination().then(data=>{
            if(data.data.success){
                setViewDestination(data.data.data)
            }
            else{
                toast.error(data.data.message)
            }
        })
        .catch(err=>{
            console.log(err)
            toast.error("Something went wrong")
        })
    })

    const changeStatus=(id,status)=>{
        console.log(id)
        console.log(status)
        setLoading(true)
        if(status==true){
          var upstatus=false
         }
         else{
          var upstatus=true
         }
         let data={
           _id:id, 
           status: upstatus
         }
         apiServices.changeDestinationStatus(data).then(data=>{
            setTimeout(()=>{
                setLoading(false)
            },1500)
            if(data.data.success){
                toast.success(data.data.message)
            }else{
                toast.error(data.data.message)
            }
         }).catch(err=>{
            console.log(err)
            toast.error("Something Went Wrong")
         })
    }
    return (
        <>
            <div className="container-fluid p-5">
            <div className="row my-5"></div>
            <div className="d-flex justify-content-center">
          <ClipLoader loading={loading} cssOverride={override} size={120}/>
      </div>

                <div className="row  color-b">
                    <div className="col-md-8 mx-auto mt-5 mb-5 my-5 p-5">
                    <Link to="/admin/addlocation">
                            <button type="" className='btn btn-dark my-2'>Add Destination</button>
                    </Link>
                        <div class="card color-m">
                            <div class="card-body">
                                <h5 class="card-title">View Destination</h5>
                                <hr/>
                    <table className="table table-bordered table-responsive table-hover">
                    <thead>
                    <tr>
                            <th>Sr.No</th>
                            <th>Destination image</th>
                            <th>Destinaion name</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                        {viewDestination?.map((el,index)=>(
                            <tr key={index}>
                                <td>{index+1}</td>
                                <td>
                                    <img className="img-fluid" alt="" src={BASE_URL_IMG+el?.destination_image}
                                    style={{height:"100px"}}/>
                                </td>
                                <td>{el?.destination_name}</td>
                                {el?.status?<td>Active</td>:<td>In-active</td>}
                                <td>
                                    <Link to={"/admin/viewlocation/edit/"+`${el?._id}`}> 
                                    <button type="submit" className='btn btn-outline-success mx-2'>Update</button>
                                    </Link>
                                    <button type="submit" className='btn btn-outline-danger border border-danger ' onClick={()=>{changeStatus(el?._id,el?.status)}}>Change Status</button>
                                </td>
                            </tr>
                        ))}  
                </table>
                              
                            </div>
                            
                        </div>
                    </div>
                </div>
                
            </div>
        </>
    )
}
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import apiServices from '../apiServices'
import { toast } from 'react-toastify'
import { Link } from 'react-router-dom'
import { BASE_URL_IMG } from '../apiServices'
import ClipLoader from 'react-spinners/ClipLoader';
export default function ViewPlace() {
    const [place,setPlace]= useState()
    const [loading,setLoading] = useState()
    const override={
      "display":"block",
      "margin":"0 auto",
      "position":"absolute",
      "top":"35%",
      "zIndex":"1",  
      }
    const param= useParams()
    const id= param.id
    console.log(id)
    useEffect(()=>{
        let data={
            destinationId:id
        }
        apiServices.customerAllPlaces(data).then(data=>{
            setTimeout(()=>{
                setLoading(false)
            },1500)
            if(data.data.success){
                // toast.success(data.data.message)
                setPlace(data.data.data)
                // console.log(data.data.data)
            }
            else{
                toast.error(data.data.message)
            }
        }).catch(err=>{
            console.log(err)
            toast.error("Something went Wrong")
        })
    },[loading])
  return (
    <div>
         <div className='p-5'></div>
         <div className="container-fluid row p-5">
         <div className="d-flex justify-content-center">
          <ClipLoader loading={loading} cssOverride={override} size={120}/>
      </div>
      {place?.length>0 ?
      <div className="container-fluid row">
            {place?.map((data,i)=>(
                <div class="card mx-2 my-3" style={{width:"350px"}}  key={i}>
                <img class="card-img-top mx-auto" style={{height:"150px", width:"170px"}} src={BASE_URL_IMG+data?.place_image} alt="Card image cap"/>
                <h5 className='card-title'>{data?.place_name}</h5>
                <div class="card-body mx-auto">
                    {/* <p class="card-text">{data.place_description}</p> */}
                    <Link to={"/user/allhotels/"+`${data?._id}`}>
                    <a href="#" class="btn btn-dark mx-auto my-2">View Hotels</a>
                    </Link>
                    <Link to={"/user/allplaces/single/"+`${data?._id}`}>
                    <a href="#" class="btn btn-dark mx-1 my-2">View More</a>
                    </Link>
                </div>
                </div>
            ))}
            </div>  
            :  <p className="text-center fs-1 text-dark text-bold">No Data Found</p>}
    </div>  
    </div>
  )
}

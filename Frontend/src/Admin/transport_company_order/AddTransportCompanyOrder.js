import React, { useEffect, useState } from 'react'
import apiServices from '../../apiServices'
import { toast } from 'react-toastify'

export default function AddTransportCompanyOrder() {
    const [pricingId,setPricingId]= useState()
    const [price,setAllPrices]= useState()
    const [noOfPerson,setNoOfPerson] =useState()
    const [totalCharges,setTotalCharges]= useState()
    const [userId,setUserId] = useState()
    const [transportCompanyId,setTransportCompanyId]=useState()
    const [transports,setAllTransports]=useState()
    const override={
      "display":"block",
      "margin":"0 auto",
      "position":"absolute",
      "top":"35%",
      "zIndex":"1",  
      }

    const pricing =e=>{
        setPricingId(e.target.value)
    }
    const person=e=>{
        setNoOfPerson(e.target.value)
    }
    const charges=e=>{
        setTotalCharges(e.target.value)
    }
    const company=e =>{
      setTransportCompanyId(e.target.value)
    }
    useEffect(()=>{
      apiServices.viewAllTransportCompanyPricing().then(data=>{
        setAllPrices(data.data.data)
      })
      apiServices.viewAllTransportCompany().then(data=>{
        setAllTransports(data.data.data)
      })
      let userId= sessionStorage.getItem("userId")
      // let username= sessionStorage.getItem("username")
      setUserId(userId)
        // apiServices. 
    },[])
    const handleOrderForm=()=>{
        let data = new FormData()
        data.append("pricingId",pricingId)
        data.append("noOfPerson",noOfPerson)
        data.append("totalCharges",totalCharges)
        data.append("userId",userId)
        data.append("transportCompanyId",transportCompanyId)
        apiServices.addTransportOrder().then(data=>{
            if(data.data.success){
                console.log(data.data.data)
                toast.success(data.data.message)
                setPricingId("")
                setNoOfPerson("")
                setTotalCharges("")
                setTransportCompanyId("")
                setUserId("")
            }
            else{
                toast.error(data.data.message)
            }
        }).catch(err=>{
            console.log(err)
            toast.error("Somehing went Wrong")
        })
        
    }
  return (
    <>
        <div  className='container p-5'>
        <div className='col-md-10 mx-auto my-5'>
          <div className="form-row row">
            <div class="form-group col-md-6">
              <label className='form-label'>Pricing ID</label>
              <select className='form-control py-0' value={pricingId} onChange={pricing} required>
                <option disabled selected>Pricing</option>
                {price?.map((el,index)=>(
                  <option key={index} value={el?._id}>{el?.transportCompanyId}</option>
                ))}
              </select>
            </div>
            <div class="form-group col-md-6">
              <label className='form-label'>Transport Company ID</label>
              <select className='form-control py-0' value={transportCompanyId} onChange={company} required>
                <option disabled selected >Transport Company ID</option>
                {transports.map((el,index)=>(
                  <option key={index} value={el?._id}>{el?.transport_company_name}</option>
                ))}
              </select>
            </div>
          </div>
          <div class="form-row row">
          <div class="form-group col-md-6">
                <label className='form-label'>No of Persons</label>
                <input type="text" class="form-control" value={noOfPerson} onChange={person} required/>
              </div>
              <div class="form-group col-md-6">
                <label className='form-label'>Total Charges</label>
                <input type="text" class="form-control" value={totalCharges} onChange={charges} required/>
              </div>
            </div>
            <div class="form-row row ">
            <div class="form-group col-md-6 ">
                <label className='form-label'>User ID</label>
                <input type="text" class="form-control" value={userId} required/>
              </div>
              </div>
          <br/>
            <button onClick={handleOrderForm} class="btn btn-dark col-4 offset-md-4">Save</button>
 
        </div>
        </div>

      
    </>
  )
}

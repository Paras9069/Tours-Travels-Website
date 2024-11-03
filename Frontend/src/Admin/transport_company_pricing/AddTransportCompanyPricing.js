import React, { useEffect, useState } from 'react'
import apiServices from '../../apiServices'
import { toast } from 'react-toastify'

export default function AddTransportCompanyPricing() {
    const [transportCompanyId,setTransportCompanyId]= useState()
    const [transports,setTransports]= useState()
    const [fromCity, setFromCity]= useState()
    const [cities, setAllcities]= useState()
    const [toCity,setToCity]= useState()
    const [places,setAllPlaces]= useState()
    const [chargesPerPerson,setChargesPerPerson]= useState()
    const [transportType,setTransportType]= useState()

    const company =(e)=>{
        setTransportCompanyId(e.target.value)
    }
    const city=(e)=>{
        setFromCity(e.target.value)
    }
    const place=(e)=>{
        setToCity(e.target.value)
    }
    const charges=e=>{
        setChargesPerPerson(e.target.value)
    }
    const transport=e=>{
        setTransportType(e.target.value)
    }
    useEffect(()=>{
        apiServices.viewAllTransportCompany().then(data=>{
            setTransports(data.data.data)
        })
        apiServices.viewAllCity().then(data=>{
            setAllcities(data.data.data)
        })
        apiServices.allPlaces().then(data=>{
            setAllPlaces(data.data.data)
        })
    },[])

    const handlePricingForm=e=>{
        e.preventDefault()
        let data= new FormData()
        data.append("transportCompanyId",transportCompanyId)
        data.append("formCity",fromCity)
        data.append("toCity",toCity)
        data.append("chargesPerPerson",chargesPerPerson)
        data.append("transportType",transportType)
        apiServices.addTransportCompanyPricing(data).then(data=>{
            console.log(data.data)
            if(data.data.success){
                toast.success(data.data.message)
                setTransportCompanyId("")
                setFromCity("")
                setToCity("")
                setChargesPerPerson("")
                setTransportType("")
            }else{
                
                toast.error(data.data.message)
            }
        }).catch(err=>{
            console.log(err)
            toast.error("Something went wrong")
        })
    }
  return (  
    <div>
       <div className='container p-5'>
        <div className='col-md-8 mx-auto my-5'>
          <div className="form-row row">
          <div class="form-group col-md-6">
              <label className='form-label'>Transport Company</label>
              <select className='form-control py-0' value={transportCompanyId} onChange={company} required>
                <option disabled >Choose Company</option>
                {transports?.map((el,index)=>(
                  <option key={index} value={el?._id}>{el?.transport_company_name}</option>
                ))}
              </select>
            </div>
            <div class="form-group col-md-6">
              <label className='form-label'>From City</label>
              <select className='form-control py-0' value={fromCity} onChange={place} required>
                <option disabled selected >Choose City</option>
                {cities?.map((el,index)=>(
                  <option key={index} value={el?._id}>{el?.city_name}</option>
                ))}
              </select>
            </div>
            </div>
          <div className="form-row row">
          <div class="form-group col-md-6">
              <label className='form-label'>Place</label>
              <select className='form-control py-0' value={toCity} onChange={city} required>
                <option disabled selected >Choose Place</option>
                {places?.map((el,index)=>(
                  <option key={index} value={el?._id}>{el?.place_name}</option>
                ))}
              </select>
            </div>
              <div className="form-group col-md-6">
                <label className='form-label'>Charges Per Person</label>
                <input type="text" class="form-control" value={chargesPerPerson} onChange={charges} required/>
              </div>
              </div>
              <div className="form-group col-md-12">
                <label className='form-label'>Transport Type</label>
                <input type="text" class="form-control" value={transportType} onChange={transport} required/>
              </div>
          <br/>

            <button type="submit" onClick={handlePricingForm} className="btn btn-dark col-4 offset-md-4">Save</button>

        </div>

        </div>
        </div>
      
  )
}

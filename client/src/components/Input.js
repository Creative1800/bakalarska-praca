import React, { useState } from 'react'
//http://drive.google.com/uc?export=view&id=
//import boy from 'https://drive.google.com/thumbnail?id=13UDr1YS4exhtovTEAbOOImnMVylZ_cQW'
/* https://drive.google.com/file/d/13UDr1YS4exhtovTEAbOOImnMVylZ_cQW/view?usp=sharing */
import insertImage from '../assets/1.png';
import InputModal from './InputModal';

const Input = (props) => {
  
  const getInputValue = (event)=>{
    const inputValue = event.target.value;
    props.handleChange(props.id, inputValue);
  };

  const handle = () => {
    const elem = document.getElementsByClassName("input--comp");//.getElementById("input--comp1");
    let rect = elem[props.id].getBoundingClientRect();
    props.toggleModal(rect.bottom, rect.left, props.id)
  }

  return (
    <>
    { props.questionType ?
      <div id='input--comp1' className='input--comp'>
        { props.picNameFromModal && props.picNameFromModal[1] == props.id ?
          <img 
            onClick={handle} 
            className='input--img' 
            src={require(`../assets/piktograms/${props.picNameFromModal[0]}.png`)}
          />
          :
          <img 
            onClick={handle} 
            className='input--img input--insert--image'
            src={insertImage}
          />
        }
        {/* <InputModal  
          piktogramList={props.inputContent}
          isModalOpened={isModalOpened}
          toggleModal={toggleModal}
        /> */}
        <p className='input--p'>{props.inputContent.text}</p>
      </div>
      :
      <div className='input--comp'>
        <img  
          className='input--img' 
          src={require(`../assets/piktograms/${props.inputContent.pic}.png`)} 
          alt="piktogram" 
        />
        <input onChange={getInputValue} className='input--input' />
      </div>
    }
    </>
  )
}

export default Input
//<img className='input--img' src={image} />
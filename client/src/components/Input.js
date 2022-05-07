import React, { useEffect, useState } from 'react'
import { io } from 'socket.io-client';
//http://drive.google.com/uc?export=view&id=
//import boy from 'https://drive.google.com/thumbnail?id=13UDr1YS4exhtovTEAbOOImnMVylZ_cQW'
/* https://drive.google.com/file/d/13UDr1YS4exhtovTEAbOOImnMVylZ_cQW/view?usp=sharing */
import insertImage from '../assets/1.png';
import '../styles/InputModal.scss';

const Input = (props) => {
  const [disabledInput, setDisabledInput] = useState(false);
  const socket = io('http://localhost:5000')

  
  useEffect(() => {

  
    if(props.isInputInteracted) {
      const el = document.getElementsByClassName("input--input");
      //console.log(props.isInputInteracted)
      if( props.isInputInteracted.isInteracted && 
        props.isInputInteracted.username === props.username) {
          setDisabledInput(false)
          console.log("interacted by me", 
            props.id, 
            props.isInputInteracted.isInteracted,
            props.isInputInteracted.username,
            props.username)
          
      } else if(props.isInputInteracted.isInteracted && 
        props.isInputInteracted.username !== props.username) {
          setDisabledInput(true)
        console.log("interacted by somebody else", 
          props.id, 
          props.isInputInteracted.isInputInteracted,
          props.isInputInteracted.username,
          props.username)
      } else if(!props.isInputInteracted.isInteracted) {
          setDisabledInput(false)
        console.log("not interacted")
      }
    }
  }, [])
  
  
  /* if (props.picsArray && props.picsArray[props.id] !== undefined) {
    props.handleChange(props.id, props.picsArray[props.id]);
  } */
  
 
  


  if(props.isInputInteracted) {
    const el = document.getElementsByClassName("input--input");
    document.addEventListener('click', function(event) {
      if(!el) return
      var isClickInsideElement = el[props.id].contains(event.target);
      if (!isClickInsideElement && props.isInputInteracted.username === props.username) {
        props.updateInputValue(props.id)          
      }
    });
  }
  
  const getInputValue = (event)=>{
    const inputValue = event.target.value;
    props.handleChange(props.id, inputValue);
  };

  const handle = () => {
    const elem = document.getElementsByClassName("input--comp");
    let rect = elem[props.id].getBoundingClientRect();
    props.toggleModal(rect.bottom, rect.left, props.id)
  }

  return (
    <>
    { props.questionType ?
      <div  className='input--comp'>
        { props.picsArray && props.picsArray[props.id] !== undefined ?
          <img 
            onClick={handle} 
            className='input--img input--img--inserted' 
            id='four'
            src={require(`../assets/piktograms/${props.picsArray[props.id]}.png`)}
          />
          :
          <img 
            onClick={handle} 
            className='input--img input--insert--image'
            id='four'
            src={insertImage}
          />
        }
        <p className='input--p'>{props.inputContent.text}</p>
      </div>
      :
      <div className='input--comp'>
        <img  
          className='input--img' 
          src={require(`../assets/piktograms/${props.inputContent.pic}.png`)} 
          alt="piktogram" 
        />
        { props.solutionArray !== undefined ?
          <input 
          onChange={getInputValue} 
          defaultValue={props.solutionArray}
          onClick={() => props.handleInputClick(props.id, true)}  
          className='input--input' 
          />
          :
          <input 
          onChange={getInputValue} 
          onClick={() => props.handleInputClick(props.id, true)}  
          className='input--input' 
          />
        }
      </div>
    }
    </>
  )
}

export default Input
//<img className='input--img' src={image} />
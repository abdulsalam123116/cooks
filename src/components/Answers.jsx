import React from 'react';

export default class Answers extends React.Component{

    render(){

        return(
            <div >
                <ul>
                    {this.props.answerOptions.map((item, index) => {
                        return (
                            <li  className='answerOption'
                                 onClick={this.props.answerCallback}
                                 value={index}
                                 key={index}>
                                <input
                                    type="radio"
                                    className="radioCustomButton"
                                    />
                                <label >
                                    {item}
                                </label>
                                </li>
                        )
                    })}
                </ul>
            </div>
        )
    }
}


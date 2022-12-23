import React from 'react';
//styles
import '../styles/App.scss';

const DetailPage = props => {
    //props
    const { country, toggleDetailPageOFF } = props;
    return (
        <div className='detailPage' onClick={()=>toggleDetailPageOFF()}>
            {country?.name?.common}
        </div>
    );
};

export default DetailPage;
import React, {useState, useEffect} from "react";

const BrandForm = (props) => {

    const initialValues = {
        brandName: ''
    }

    const [ values, setValues ] = useState(initialValues);

    useEffect(()=> {
        if(props.currentBrandId === '') {
            setValues(
                {
                    ...initialValues
                }
            )
        } else {
            setValues({
                ...props.brands[props.currentBrandId]
            })
        }
    }, [props.currentBrandId, props.brands])

    const handleChange = (e) => {
        const { name, value } = e.target;
        setValues({
            ...values,
            [name]: value
        })
    }

    const handleFormSubmit  = e => {
        e.preventDefault();
        props.addOrEdit(values);
    }

    return ( 
        <form autoComplete="off" onSubmit={handleFormSubmit}>
            <div className="form-group">
                <div className="input-group-prepend">
                    <div className="input-group-text">
                        <i className="fas fa-user"></i>
                    </div>
                    <input className="form-control"
                        placeholder="Brand Name"
                        name="brandName"
                        value={values.brandName}
                        onChange={handleChange}
                    />
                </div>
            </div>
            <div className="form-group">
                <input type="submit" value={props.currentBrandId === '' ? "Save" : "Update" } className="btn btn-primary btn-block" />
            </div>
        </form>
    );
}
 
export default BrandForm;
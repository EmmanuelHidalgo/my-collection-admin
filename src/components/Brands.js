import React,  {useState, useEffect} from "react";
import BrandForm from "./BrandForm";
import firebaseDb from "../firebase";

const Brands = () => {
     const [brands, setBrands] = useState({});
     const [currentBrandId, setCurrentBrandId] = useState('');

    useEffect(()=> {
        firebaseDb.child('brands').on('value', snapshot => {
            if(snapshot.val() !== null) {
                setBrands({
                    ...snapshot.val()
                });
            } else {
                setBrands({});
            }
        })
    }, []);

    const addOrEdit = obj => {
        if(currentBrandId === '') {
            firebaseDb.child('brands').push(
                obj,
                err => {
                    if (err) {
                        console.log(err);
                    }
                }
            );
        } else {
            firebaseDb.child(`brands/${currentBrandId}`).set(
                obj,
                err => {
                    if (err) {
                        console.log(err);
                    } else {
                        setCurrentBrandId('')
                    }
                }
            );
        }
        
    }

    const handleDelete = (currentBrandId) => {
        firebaseDb.child(`brands/${currentBrandId}`).remove(
            err => {
                if (err) {
                    console.log(err);
                } else {
                    setCurrentBrandId('')
                }
            }
        );
    }


    return (
        <>
            <div className="jumbotron jumbotron-fluid">
                <div className="container">
                    <h1 className="display-4">Brand Register</h1>
                </div>
            </div>
            <div className="row">
                <div className="col-md-5">
                    <BrandForm {...({addOrEdit, currentBrandId,  brands})}/>
                </div>
                <div className="col-md-7">
                    <table className="table table-borderless table-stripped">
                        <thead className="thead-light">
                            <tr>
                                <th>Brand Name</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                Object.keys(brands).map((id, index) => {
                                    return <tr key={index}>
                                        <td>
                                            {brands[id].brandName}
                                        </td>
                                        <td>
                                            <a className="btn text-primary" onClick={() => setCurrentBrandId(id)}>
                                                <i className="fas fa-pencil-alt"></i>
                                            </a>
                                            <a className="btn text-danger" onClick={() => handleDelete(id)}>
                                                <i className="fas fa-trash-alt"></i>
                                            </a>
                                        </td>
                                    </tr>
                                })
                            }
                        </tbody>
                    </table>
                </div>
               
            </div>
        </>
    );
}
 
export default Brands;
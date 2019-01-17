import React from 'react';
import { NavLink } from 'react-router-dom';

//functional component to only render data recieved from parent component
export default (props) => {
    return (
        //Iterate rhrough book list from prop and display
            props.list.map(b =>
                <div className="jumbotron p-3 my-3" key={b.id}>
                    <div className="row">
                        <div className="col-sm-2 col-md-2">
                            <img src={b.imageUrl} alt={b.title} />
                        </div>
                        <div className="col-sm-10 col-md-10">
                            <h3>{b.title}</h3>
                            {/* if clicked then take to Book component to display in detail about book */}
                            <NavLink to={`/book/${b.id}`}>read more...</NavLink>
                        </div>
                    </div>
                </div>
            )
    )
}
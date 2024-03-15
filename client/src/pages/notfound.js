import React from 'react'
import { Link } from 'react-router-dom'

function Notfound() {
  return (
    <div>
    <br/><br/><br/>
    <div class="page-contain page-404">

<div id="main-content" class="main-content">
    <div class="container">

        <div class="row">

            <div class="content-404">
                <h1 class="heading">404</h1>
                <h2 class="title">Oops! That page can't be found.</h2>
                <h3 class="title" style={{color:"red"}}>Lost Your Way?</h3>
                <p>Sorry, but the page you are looking for is not found. Please, make sure you have typed the current URL.</p>
                <Link class="button" to="/" style={{textDecoration:"none"}}>Go to Home</Link>
            </div>

        </div>

    </div>

</div>

</div>
    </div>
  )
}

export default Notfound

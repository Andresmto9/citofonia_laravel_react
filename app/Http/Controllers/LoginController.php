<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class LoginController
{
    public function index(){
        return view('login');
    }
}

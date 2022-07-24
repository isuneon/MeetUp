<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET,POST,PUT,DELETE,OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With, X-XSRF-TOKEN');
/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
 */

Route::post('info/user', 'Meetup\ApiMeetupController@getInfoUser');
Route::post('user/groups', 'Meetup\ApiMeetupController@getUserGroups');
Route::post('group', 'Meetup\ApiMeetupController@getGroup');
Route::post('members/groups', 'Meetup\ApiMeetupController@getMembersGroups');
Route::post('comments/groups', 'Meetup\ApiMeetupController@getCommentsGroup');

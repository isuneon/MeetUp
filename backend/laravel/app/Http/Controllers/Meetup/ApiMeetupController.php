<?php

namespace App\Http\Controllers\Meetup;

use App\Http\Controllers\ApiController;
use App\User;
use DMS\Service\Meetup\MeetupKeyAuthClient;
use Guzzle\Http\Exception\ClientErrorResponseException;
use Illuminate\Http\Request;
use \GuzzleHttp\Client;

class ApiMeetupController extends ApiController
{

    public function getInfoUser(Request $request)
    {
        $data = array();
        try {
            $client = MeetupKeyAuthClient::factory(array('key' => env('MEETUP_API_KEY')));

            $response                  = $client->GetMembers(array('member_id' => $request->meetup_id));
            list($response, $jsonText) = explode("{", $response, 2);
            $jsonText                  = "{" . $jsonText;
            return response()->json($jsonText);

        } catch (ClientErrorResponseException $exception) {
            $responseBody = $exception->getResponse()->getBody(true);
            return $responseBody;
        }
    }

    public function getUserGroups(Request $request)
    {
        $user = $this->getUser($request->meetup_id);

        if ($user) {
            $clientApi = new Client();

            $groups = $clientApi->request('GET', 'https://api.meetup.com/self/groups',
                [
                    'headers' => [
                        'Content-Type'  => 'application/json',
                        'Authorization' => 'bearer ' . $user->remember_token,
                    ],
                ]);
            return $groups;

        } else {
            return response()->json(['error' => "No se encontro el usuario", 'code' => 400], 400);
        }

    }

    public function getGroup(Request $request)
    {
        $group_id = $request->group_id;

        $url = "https://api.meetup.com/2/groups?format=json&group_id=" . $group_id;

        $user = $this->getUser($request->meetup_id);

        if ($group_id && $user) {
            $clientApi = new Client();

            $member_group = $clientApi->request('GET', $url,
                [
                    'headers' => [
                        'Content-Type'  => 'application/json',
                        'Authorization' => 'bearer ' . $user->remember_token,
                    ],
                ]);

            return $member_group;

        } else {
            return response()->json(['error' => "No se encontro el usuario", 'code' => 400], 400);
        }

    }

    public function getMembersGroups(Request $request)
    {
        $group_id    = $request->group_id;
        $member_page = $request->member_page;
        $number_page = $request->number_page;
        $url         = "https://api.meetup.com/2/members?offset=" . $number_page . "&sign=True&format=json&group_id=" . $group_id . "&photo-host=public&page=" . $member_page . "&order=name";

        $user = $this->getUser($request->meetup_id);

        if ($group_id && $user) {
            $clientApi = new Client();

            $member_group = $clientApi->request('GET', $url,
                [
                    'headers' => [
                        'Content-Type'  => 'application/json',
                        'Authorization' => 'bearer ' . $user->remember_token,
                    ],
                ]);

            return $member_group;

        } else {
            return response()->json(['error' => "No se encontro el usuario", 'code' => 400], 400);
        }

    }
    public function getCommentsGroup(Request $request)
    {
        $group_id    = $request->group_id;
        $member_page = $request->member_page;
        $number_page = $request->number_page;
        $url         = "https://api.meetup.com/comments?offset=" . $number_page . "&format=json&group_id=" . $group_id . "&photo-host=public&page=" . $member_page . "&order=ctime&sig_id=265287728&sig=59f353853ff07a328a415628fe771cdd26afbec8";

        $user = $this->getUser($request->meetup_id);

        if ($group_id && $user) {
            $clientApi = new Client();

            $member_group = $clientApi->request('GET', $url,
                [
                    'headers' => [
                        'Content-Type'  => 'application/json',
                        'Authorization' => 'bearer ' . $user->remember_token,
                    ],
                ]);

            return $member_group;

        } else {
            return response()->json(['error' => "No se encontro el usuario", 'code' => 400], 400);
        }
    }

    public function getUser($meetup_id)
    {
        $user = User::where('id_meetup', $meetup_id)
            ->orderBy('created_at', 'desc')
            ->first();
        return $user;
    }
}

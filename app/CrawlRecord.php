<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class CrawlRecord extends Model
{
    const STATE_INIT=-1;
    const STATE_CRAWLING=-2;
    const STATE_SUCCEED=0;

    public function appKey(){
        return $this->belongsTo('App\AppKey',"appKey_id");
    }

    public function spider(){
        return $this->belongsTo('App\Spider');
    }

    public function device(){
        return $this->belongsTo('App\Device');
    }
}

import{c as s}from"./app.f67b6590.js";import{_ as n}from"./plugin-vue_export-helper.21dcd24c.js";const a={},e=s(`<h2 id="ssdb\u6570\u636E\u8FC1\u79FB\u81F3redis" tabindex="-1"><a class="header-anchor" href="#ssdb\u6570\u636E\u8FC1\u79FB\u81F3redis" aria-hidden="true">#</a> SSDB\u6570\u636E\u8FC1\u79FB\u81F3Redis</h2><h3 id="\u7B80\u4ECB" tabindex="-1"><a class="header-anchor" href="#\u7B80\u4ECB" aria-hidden="true">#</a> \u7B80\u4ECB</h3><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>\u4F7F\u7528ssdb-port\u5C06SSDB\u6570\u636E\u5E93\u540C\u6B65\u5230redis\u6570\u636E\u5E93
ssdb-port\u662F\u4E00\u6B3E\u9002\u7528\u4E8ESSDB\u6570\u636E\u5E93\u7684\u6570\u636E\u540C\u6B65\u5DE5\u5177
\u53EF\u5B9E\u73B0\u5B9E\u65F6\u5355\u5411\u6570\u636E\u540C\u6B65\u3002
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><h4 id="\u540C\u6B65\u64CD\u4F5C\u7684\u9650\u5236" tabindex="-1"><a class="header-anchor" href="#\u540C\u6B65\u64CD\u4F5C\u7684\u9650\u5236" aria-hidden="true">#</a> \u540C\u6B65\u64CD\u4F5C\u7684\u9650\u5236</h4><ul><li>\u6CE8\u610F</li></ul><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>\u5728SSDB\u4E2D\u6267\u884Cssdb-port\u6682\u4E0D\u652F\u6301\u7684\u547D\u4EE4\u4FEE\u6539\u7684\u6570\u636E\u5C06\u65E0\u6CD5\u540C\u6B65\u5230Redis\u4E2D\u3002
\u4F7F\u7528hset\u6216hget\u547D\u4EE4\u65F6\uFF0C\u5982\u679C\u5BF9\u8C61key\u4E3A\u4E2D\u6587\u5219\u8BE5\u64CD\u4F5C\u65E0\u6CD5\u540C\u6B65\u3002\u4F7F\u7528\u5176\u5B83\u652F\u6301\u7684\u547D\u4EE4\u65E0\u6B64\u9650\u5236
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><ul><li>ssdb\u547D\u4EE4</li></ul><blockquote><p>\u76EE\u524D\u652F\u6301\u540C\u6B65\u7684SSDB\u547D\u4EE4\u5982\u4E0B</p></blockquote><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>set
setx
setnx
expire
del
get
incr
qpop_front
qpush_front
qclear
qtrim_front
qtrim_back
zset
zdel
zincr
multi_zdel
multi_zset
hset
hdel
hclear
multi_hset
multi_hdel
hincr
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br></div></div><h3 id="\u5B89\u88C5\u51C6\u5907" tabindex="-1"><a class="header-anchor" href="#\u5B89\u88C5\u51C6\u5907" aria-hidden="true">#</a> \u5B89\u88C5\u51C6\u5907</h3><ul><li>\u524D\u63D0</li></ul><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>ssdb-port\u9700\u8981\u80FD\u591F\u8FDE\u63A5\u6E90ssdb\u4E0E\u76EE\u7684redis\uFF0C\u4F5C\u4E3A\u5B9E\u65F6\u540C\u6B65\u7684\u5DE5\u5177
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><ul><li>\u540C\u6B65\u539F\u7406</li></ul><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>ssdb-port \u4F5C\u4E3Assdb\u4ECE\u8282\u70B9\u8FDB\u884C\u542F\u52A8\uFF0C\u7136\u540E\u5C06\u83B7\u53D6\u5230\u7684\u6570\u636E\u89E3\u6790\u8F6C\u6362\u4E3Aredis\u652F\u6301\u7684\u683C\u5F0F\u540E\u540E\u53D1\u9001\u81F3redis
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><ul><li>\u6CE8\u610F</li></ul><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>\u9700\u8981\u6CE8\u610F\u7684\u662Fssdb-port\u662F\u5B9E\u65F6\u540C\u6B65\u7684\u5DE5\u5177
\u56E0\u6B64\u5168\u91CF\u540C\u6B65\u5B8C\u6210\u540E\uFF0C\u5728\u8FDE\u63A5\u5173\u95ED\u524D\uFF0CSSDB\u4E2D\u65B0\u589E\u7684\u6570\u636E\u4E5F\u4F1A\u589E\u91CF\u540C\u6B65\u5230Redis\u5B9E\u4F8B\u4E2D
\u5982\u53EA\u9700\u5386\u53F2\u6570\u636E\uFF0C\u8BF7\u8BB0\u5F97\u5148\u628A\u6E90ssdb\u7684\u5176\u4ED6\u5199\u8FDB\u53E3\u505C\u6389\uFF0C\u4E0D\u7136\u4F1A\u4E00\u76F4\u6709\u6570\u636E\u8FDB\u6765\uFF0C\u4E00\u76F4\u5728\u540C\u6B65
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><h3 id="\u5B89\u88C5ssdb-port" tabindex="-1"><a class="header-anchor" href="#\u5B89\u88C5ssdb-port" aria-hidden="true">#</a> \u5B89\u88C5ssdb-port</h3><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code># wget http://docs-aliyun.cn-hangzhou.oss.aliyun-inc.com/assets/attach/94155/cn_zh/1547627852086/ssdb-port.tar.gz
# tar -xvf ssdb-port.tar.gz
# cd ssdb-port

</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br></div></div><h3 id="\u4FEE\u6539\u914D\u7F6E\u6587\u4EF6" tabindex="-1"><a class="header-anchor" href="#\u4FEE\u6539\u914D\u7F6E\u6587\u4EF6" aria-hidden="true">#</a> \u4FEE\u6539\u914D\u7F6E\u6587\u4EF6</h3><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code># cd ssdb-port
# vi ssdb_port.conf
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><ul><li>ssdb_port.conf</li></ul><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code>
<span class="token comment"># ssdb_port\u7684\u6570\u636E\u76EE\u5F55\uFF0C\u4E00\u822C\u9ED8\u8BA4\u5F53\u524D\u76EE\u5F55\u4E0B\uFF08\u6CE8\u610F\u78C1\u76D8\uFF09</span>
work_dir <span class="token operator">=</span> ./var_ssdb_port  
pidfile <span class="token operator">=</span> ./var_ssdb_port/ssdb.pid

<span class="token comment"># ssdb-port\u7684\u8FDE\u63A5\u4FE1\u606F\uFF0C\u65E0\u9700\u4FEE\u6539\uFF08\u8FD9\u91CC\u662Fssdb-port\u7684\u7AEF\u53E3\uFF09</span>
server:
    ip: <span class="token number">127.0</span>.0.1
    port: <span class="token number">8899</span>
    <span class="token comment">#readonly: yes</span>

replication:
    binlog: <span class="token function">yes</span>
        capacity: <span class="token number">100000000</span>
    <span class="token comment"># Limit sync speed to *MB/s, -1: no limit</span>
    sync_speed: -1
    slaveof:
        <span class="token comment"># to identify a master even if it moved(ip, port changed)</span>
        <span class="token comment"># if set to empty or not defined, ip:port will be used.</span>
        id: svc_1
        <span class="token comment"># sync|mirror, default is sync</span>
        type: <span class="token function">sync</span>
        host: localhost <span class="token comment"># SSDB Master\uFF08\u6E90SSDB\u6570\u636E\u5E93\uFF09\u7684\u8FDE\u63A5\u5730\u5740</span>
        port: <span class="token number">8888</span> <span class="token comment"># SSDB Master\uFF08\u6E90SSDB\u6570\u636E\u5E93\uFF09\u7684\u7AEF\u53E3</span>
        <span class="token comment">#auth: password</span>
        redis_host: localhost <span class="token comment"># \u76EE\u7684Redis\u5B9E\u4F8B\u7684\u8FDE\u63A5\u5730\u5740</span>
        redis_port: <span class="token number">6379</span>  <span class="token comment"># \u76EE\u7684Redis\u5B9E\u4F8B\u7684\u7AEF\u53E3</span>
        redis_auth: password  <span class="token comment"># \u76EE\u7684Redis\u5B9E\u4F8B\u7684\u8BA4\u8BC1\u5BC6\u7801\uFF08\u6CA1\u6709\u5BC6\u7801\u53EF\u6CE8\u91CA\u6B64\u9879\uFF09</span>

logger:
    level: debug
    output: log_ssdb_port.txt  <span class="token punctuation">(</span>\u751F\u6210\u7684\u65E5\u5FD7\uFF0C\u6839\u636E\u6570\u636E\u91CF\u5927\u5C0F\u51B3\u5B9A\uFF0C\u8FD8\u662F\u633A\u5927\u7684\uFF0C\u8BB0\u5F55\u4E86\u6240\u6709\u64CD\u4F5C<span class="token punctuation">)</span>
    rotate:
        size: <span class="token number">1000000000</span>

leveldb:
    <span class="token comment"># in MB</span>
    cache_size: <span class="token number">500</span>
    <span class="token comment"># in MB</span>
    write_buffer_size: <span class="token number">64</span>
    <span class="token comment"># in MB/s</span>
    compaction_speed: <span class="token number">1000</span>
    <span class="token comment"># yes|no</span>
    compression: <span class="token function">yes</span>


</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br><span class="line-number">35</span><br><span class="line-number">36</span><br><span class="line-number">37</span><br><span class="line-number">38</span><br><span class="line-number">39</span><br><span class="line-number">40</span><br><span class="line-number">41</span><br><span class="line-number">42</span><br><span class="line-number">43</span><br><span class="line-number">44</span><br><span class="line-number">45</span><br><span class="line-number">46</span><br></div></div><h3 id="\u6267\u884C\u64CD\u4F5C" tabindex="-1"><a class="header-anchor" href="#\u6267\u884C\u64CD\u4F5C" aria-hidden="true">#</a> \u6267\u884C\u64CD\u4F5C</h3><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code><span class="token builtin class-name">cd</span> ssdb-port
./ssdb-port-2.17 ssdb_port.conf
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><blockquote><p>\u5982\u679C\u6570\u636E\u91CF\u5927\uFF0C\u6267\u884C\u65F6\u95F4\u8FC7\u957F\uFF0C\u53EF\u4EE5\u4F7F\u7528 <code>nohup</code> \u65B9\u5F0F\u6267\u884C\u3002</p></blockquote><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code><span class="token builtin class-name">cd</span> ssdb-port
<span class="token function">nohup</span> ./ssdb-port-2.17 ssdb_port.conf <span class="token operator">&amp;</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><h3 id="\u6570\u636E\u9A8C\u8BC1" tabindex="-1"><a class="header-anchor" href="#\u6570\u636E\u9A8C\u8BC1" aria-hidden="true">#</a> \u6570\u636E\u9A8C\u8BC1</h3><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>1.ssdb_prot\u662F\u8FDB\u884C\u6570\u636E\u540C\u6B65\u7684\uFF0C\u56E0\u6B64\u5982\u679Cold\u670D\u52A1\u4E00\u76F4\u6709\u6570\u636E\u8FDB\u6765\uFF0C\u5C31\u4F1A\u4E00\u76F4\u540C\u6B65\u3002
2.\u53EF\u767B\u5F55redis\u5B9E\u4F8B\u68C0\u67E5\u6570\u636E\u540C\u6B65\u662F\u5426\u5B8C\u6210
3.\u5982\u679C\u53EA\u662F\u540C\u6B65\u5386\u53F2\u6570\u636E\uFF0C\u540C\u6B65\u5B8C\u6210\u540E\u518D\u65E5\u5FD7log_ssdb_port.txt \u4E2D\u53EF\u4EE5\u770B\u5230\u540C\u6B65\u5B8C\u6210\u7684\u5B57\u6837
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><p>&lt;......copy end......&gt;</p><p><img src="https://note.youdao.com/yws/res/10707/A06215990E564BF0A14385EFBB4472DF" alt="image"></p>`,30);function r(l,p){return e}var b=n(a,[["render",r]]);export{b as default};

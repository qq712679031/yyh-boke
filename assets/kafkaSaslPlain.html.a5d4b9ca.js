import{c as a}from"./app.f67b6590.js";import{_ as n}from"./plugin-vue_export-helper.21dcd24c.js";const s={},e=a(`<h2 id="_1-\u6DFB\u52A0-sasl-\u914D\u7F6E\u6587\u4EF6" tabindex="-1"><a class="header-anchor" href="#_1-\u6DFB\u52A0-sasl-\u914D\u7F6E\u6587\u4EF6" aria-hidden="true">#</a> 1 \u6DFB\u52A0 sasl \u914D\u7F6E\u6587\u4EF6</h2><p>\u5C06kafka_client_jaas.conf/kafka_server_jaas.conf/kafka_zoo_jaas.conf\u4E09\u4E2A\u6587\u4EF6\u653E\u5165kafka\u7684config\u6587\u4EF6\u5939\u4E2D\uFF0C\u6587\u4EF6\u4E2D\u914D\u7F6E\u7528\u6237\uFF0Cadmin\u7528\u6237\u5FC5\u987B\u914D\u7F6E\u3002</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>kafka_client_jaas.conf\u5185\u5BB9\u5982\u4E0B
KafkaClient {  
org.apache.kafka.common.security.plain.PlainLoginModule required  
username=&quot;admin&quot;  
password=&quot;admin&quot;;  
};
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br></div></div><p>kafka_server_jaas.conf\u5185\u5BB9\u5982\u4E0B</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>KafkaServer {
org.apache.kafka.common.security.plain.PlainLoginModule required
username=&quot;admin&quot;
password=&quot;admin&quot;
user_admin=&quot;admin&quot;
user_test=&quot;test#2018&quot;;
};
KafkaClient {
org.apache.kafka.common.security.plain.PlainLoginModule required
username=&quot;admin&quot;
password=&quot;admin&quot;;
};

Client {
org.apache.kafka.common.security.plain.PlainLoginModule required
username=&quot;admin&quot;
password=&quot;admin&quot;;
};
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br></div></div><p>kafka_zoo_jaas.conf\u5185\u5BB9\u5982\u4E0B</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>ZKServer{
org.apache.kafka.common.security.plain.PlainLoginModule required
username=&quot;admin&quot;
password=&quot;admin&quot;
user_admin=&quot;admin&quot;;
};
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br></div></div><h2 id="_2-\u6DFB\u52A0\u8BA4\u8BC1\u65B9\u5F0F\u5230-\u542F\u52A8\u6587\u4EF6" tabindex="-1"><a class="header-anchor" href="#_2-\u6DFB\u52A0\u8BA4\u8BC1\u65B9\u5F0F\u5230-\u542F\u52A8\u6587\u4EF6" aria-hidden="true">#</a> 2 \u6DFB\u52A0\u8BA4\u8BC1\u65B9\u5F0F\u5230 \u542F\u52A8\u6587\u4EF6</h2><p>1.\u6DFB\u52A0\u5230kafka\u7684bin\u6587\u4EF6\u5939\u4E2D\u7684zookeeper-server-start.sh,</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>export KAFKA_OPTS=&quot; -Djava.security.auth.login.config=/data/localization/kafka/config/kafka_zoo_jaas.conf -Dzookeeper.sasl.serverconfig=ZKServer&quot;
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><p>2.\u6DFB\u52A0\u5230kafka\u7684bin\u6587\u4EF6\u5939\u4E2D\u7684kafka-server-start.sh\uFF0C</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>export KAFKA_OPTS=&quot; -Djava.security.auth.login.config=/data/localization/kafka/config/kafka_server_jaas.conf&quot;
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><p>3.\u6DFB\u52A0\u5230kafka\u7684bin\u6587\u4EF6\u5939\u4E2D\u7684kafka-console-producer.sh</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>export KAFKA_OPTS=&quot; -Djava.security.auth.login.config=/data/localization/kafka/config/kafka_client_jaas.conf&quot;
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><p>4.\u6DFB\u52A0\u5230kafka\u7684bin\u6587\u4EF6\u5939\u4E2D\u7684kafka-console-consumer.sh</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>export KAFKA_OPTS=&quot; -Djava.security.auth.login.config=/data/localization/kafka/config/kafka_client_jaas.conf&quot;
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><p>5.\u4FEE\u6539kafka\u7684bin\u6587\u4EF6\u5939\u4E2D\u7684kafka-acls.sh</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>export KAFKA_OPTS=&quot; -Djava.security.auth.login.config=/data/localization/kafka/config/kafka_client_jaas.conf&quot;
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><h2 id="_3-\u6DFB\u52A0\u8BA4\u8BC1\u5230\u914D\u7F6E\u6587\u4EF6" tabindex="-1"><a class="header-anchor" href="#_3-\u6DFB\u52A0\u8BA4\u8BC1\u5230\u914D\u7F6E\u6587\u4EF6" aria-hidden="true">#</a> 3.\u6DFB\u52A0\u8BA4\u8BC1\u5230\u914D\u7F6E\u6587\u4EF6</h2><p>1.\u6DFB\u52A0\u5230kafka\u7684config\u6587\u4EF6\u5939\u4E2D\u7684consumer.properties</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>security.protocol=SASL_PLAINTEXT
sasl.mechanism=PLAIN
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><p>2.\u6DFB\u52A0\u5230kafka\u7684config\u6587\u4EF6\u5939\u4E2D\u7684producer.properties</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>security.protocol=SASL_PLAINTEXT
sasl.mechanism=PLAIN
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><p>3.\u6DFB\u52A0\u5230kafka\u7684config\u6587\u4EF6\u5939\u4E2D\u7684zookeeper.properties</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>authProvider.1=org.apache.zookeeper.server.auth.SASLAuthenticationProvider
requireClientAuthScheme=sasl
jaasLoginRenew=3600000
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><h2 id="_4-\u4FEE\u6539kafka\u7684config\u6587\u4EF6\u5939\u4E2D\u7684server-properties" tabindex="-1"><a class="header-anchor" href="#_4-\u4FEE\u6539kafka\u7684config\u6587\u4EF6\u5939\u4E2D\u7684server-properties" aria-hidden="true">#</a> 4.\u4FEE\u6539kafka\u7684config\u6587\u4EF6\u5939\u4E2D\u7684server.properties</h2><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>\u4FEE\u6539\uFF1A
listeners=SASL_PLAINTEXT://:9092
advertised.listeners=SASL_PLAINTEXT://realtime-1:9092

\u6DFB\u52A0\uFF1A
#\u4F7F\u7528\u7684\u8BA4\u8BC1\u534F\u8BAE
security.inter.broker.protocol=SASL_PLAINTEXT
#SASL\u673A\u5236
sasl.enabled.mechanisms=PLAIN
sasl.mechanism.inter.broker.protocol=PLAIN
#\u5B8C\u6210\u8EAB\u4EFD\u9A8C\u8BC1\u7684\u7C7B
authorizer.class.name=kafka.security.auth.SimpleAclAuthorizer
#\u5982\u679C\u6CA1\u6709\u627E\u5230ACL\uFF08\u8BBF\u95EE\u63A7\u5236\u5217\u8868\uFF09\u914D\u7F6E\uFF0C\u5219\u5141\u8BB8\u4EFB\u4F55\u64CD\u4F5C\u3002
#allow.everyone.if.no.acl.found=true
super.users=User:admin
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br></div></div><p>4.\u540C\u6B65\u914D\u7F6E\u6587\u4EF6\u5230\u522B\u7684\u670D\u52A1\u5668</p><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code><span class="token function">scp</span> /data/localization/kafka/config/kafka_client_jaas.conf realtime-2:/data/localization/kafka/config/
<span class="token function">scp</span> /data/localization/kafka/config/kafka_server_jaas.conf realtime-2:/data/localization/kafka/config/
<span class="token function">scp</span> /data/localization/kafka/config/kafka_zoo_jaas.conf realtime-2:/data/localization/kafka/config/
<span class="token function">scp</span> /data/localization/kafka/config/consumer.properties realtime-2:/data/localization/kafka/config/
<span class="token function">scp</span> /data/localization/kafka/config/producer.properties realtime-2:/data/localization/kafka/config/
<span class="token function">scp</span> /data/localization/kafka/config/zookeeper.properties realtime-2:/data/localization/kafka/config/
<span class="token function">scp</span> /data/localization/kafka/config/server.properties realtime-2:/data/localization/kafka/config/
<span class="token function">scp</span> /data/localization/kafka/bin/zookeeper-server-start.sh realtime-2:/data/localization/kafka/bin/
<span class="token function">scp</span> /data/localization/kafka/bin/kafka-server-start.sh realtime-2:/data/localization/kafka/bin/
<span class="token function">scp</span> /data/localization/kafka/bin/kafka-console-producer.sh realtime-2:/data/localization/kafka/bin/
<span class="token function">scp</span> /data/localization/kafka/bin/kafka-console-consumer.sh realtime-2:/data/localization/kafka/bin/

<span class="token function">scp</span> /data/localization/kafka/config/kafka_client_jaas.conf realtime-3:/data/localization/kafka/config/
<span class="token function">scp</span> /data/localization/kafka/config/kafka_server_jaas.conf realtime-3:/data/localization/kafka/config/
<span class="token function">scp</span> /data/localization/kafka/config/kafka_zoo_jaas.conf realtime-3:/data/localization/kafka/config/
<span class="token function">scp</span> /data/localization/kafka/config/consumer.properties realtime-3:/data/localization/kafka/config/
<span class="token function">scp</span> /data/localization/kafka/config/producer.properties realtime-3:/data/localization/kafka/config/
<span class="token function">scp</span> /data/localization/kafka/config/zookeeper.properties realtime-3:/data/localization/kafka/config/
<span class="token function">scp</span> /data/localization/kafka/config/server.properties realtime-3:/data/localization/kafka/config/
<span class="token function">scp</span> /data/localization/kafka/bin/zookeeper-server-start.sh realtime-3:/data/localization/kafka/bin/
<span class="token function">scp</span> /data/localization/kafka/bin/kafka-server-start.sh realtime-3:/data/localization/kafka/bin/
<span class="token function">scp</span> /data/localization/kafka/bin/kafka-console-producer.sh realtime-3:/data/localization/kafka/bin/
<span class="token function">scp</span> /data/localization/kafka/bin/kafka-console-consumer.sh realtime-3:/data/localization/kafka/bin/
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br></div></div><p>\u4FEE\u6539</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>server.properties
broker.id(\u5404\u8282\u70B9\u552F\u4E00)
advertised.listeners (\u5404\u4E2A\u670D\u52A1\u5668)
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><h2 id="_5-\u91CD\u542F\u5404\u4E2A\u670D\u52A1" tabindex="-1"><a class="header-anchor" href="#_5-\u91CD\u542F\u5404\u4E2A\u670D\u52A1" aria-hidden="true">#</a> 5.\u91CD\u542F\u5404\u4E2A\u670D\u52A1</h2><p>1.\u542F\u52A8zookeeper\u670D\u52A1</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>sh bin/zookeeper-server-start.sh config/zookeeper.properties
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><p>2.\u542F\u52A8kafka\u670D\u52A1</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>sh bin/kafka-server-start.sh config/server.properties
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><h2 id="_6-\u7ED9admin\u7528\u6237\u6388\u6743" tabindex="-1"><a class="header-anchor" href="#_6-\u7ED9admin\u7528\u6237\u6388\u6743" aria-hidden="true">#</a> 6.\u7ED9admin\u7528\u6237\u6388\u6743</h2><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>sh bin/kafka-acls.sh --authorizer-properties zookeeper.connect=localhost:2182 --add --allow-principal User:admin --group=* --topic=*
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><h2 id="_7-\u4FEE\u6539lua\u811A\u672C" tabindex="-1"><a class="header-anchor" href="#_7-\u4FEE\u6539lua\u811A\u672C" aria-hidden="true">#</a> 7.\u4FEE\u6539lua\u811A\u672C</h2><p>1.\u9700\u8981\u66F4\u65B0 \u6700\u65B0\u7684 lua\u811A\u672C \u4EE3\u7801 \u4FEE\u6539\u6587\u4EF6\u540D</p><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code><span class="token builtin class-name">cd</span>  /data/localization/nginx/lua/resty

<span class="token function">mv</span> kafka/ kafka-nosasl
<span class="token function">mv</span> kafka-sasl/  kafka
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br></div></div><p>2.\u4FEE\u6539\u94FE\u63A5\u65B9\u5F0F /data/localization/nginx/lua/utils/zgConfig.lua</p><div class="language-lua ext-lua line-numbers-mode"><pre class="language-lua"><code><span class="token keyword">local</span> broker_list <span class="token operator">=</span> <span class="token punctuation">{</span>
    <span class="token punctuation">{</span>
        host <span class="token operator">=</span> <span class="token string">&quot;realtime-1&quot;</span><span class="token punctuation">,</span>
        port <span class="token operator">=</span> <span class="token number">9092</span><span class="token punctuation">,</span>
        sasl_config <span class="token operator">=</span> <span class="token punctuation">{</span>
            mechanism <span class="token operator">=</span> <span class="token string">&quot;PLAIN&quot;</span><span class="token punctuation">,</span>
            user <span class="token operator">=</span> <span class="token string">&quot;admin&quot;</span><span class="token punctuation">,</span>
            password <span class="token operator">=</span> <span class="token string">&quot;admin&quot;</span>
        <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token punctuation">{</span>
        host <span class="token operator">=</span> <span class="token string">&quot;realtime-2&quot;</span><span class="token punctuation">,</span>
        port <span class="token operator">=</span> <span class="token number">9092</span><span class="token punctuation">,</span>
        sasl_config <span class="token operator">=</span> <span class="token punctuation">{</span>
            mechanism <span class="token operator">=</span> <span class="token string">&quot;PLAIN&quot;</span><span class="token punctuation">,</span>
            user <span class="token operator">=</span> <span class="token string">&quot;admin&quot;</span><span class="token punctuation">,</span>
            password <span class="token operator">=</span> <span class="token string">&quot;admin&quot;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token punctuation">{</span>
        host <span class="token operator">=</span> <span class="token string">&quot;realtime-3&quot;</span><span class="token punctuation">,</span>
        port <span class="token operator">=</span> <span class="token number">9092</span><span class="token punctuation">,</span>
        sasl_config <span class="token operator">=</span> <span class="token punctuation">{</span>
            mechanism <span class="token operator">=</span> <span class="token string">&quot;PLAIN&quot;</span><span class="token punctuation">,</span>
            user <span class="token operator">=</span> <span class="token string">&quot;admin&quot;</span><span class="token punctuation">,</span>
            password <span class="token operator">=</span> <span class="token string">&quot;admin&quot;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>

<span class="token comment">-- config</span>
<span class="token keyword">local</span> zgConfig <span class="token operator">=</span> <span class="token punctuation">{</span>
    broker_list <span class="token operator">=</span> broker_list
<span class="token punctuation">}</span>
<span class="token keyword">return</span> zgConfig<span class="token punctuation">;</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br><span class="line-number">35</span><br></div></div><p>3.reload nginx \u5373\u53EF</p><h2 id="_8-\u66F4\u65B0\u540E\u5E38\u7528kafka-\u547D\u4EE4-\u5F85\u8865\u5145" tabindex="-1"><a class="header-anchor" href="#_8-\u66F4\u65B0\u540E\u5E38\u7528kafka-\u547D\u4EE4-\u5F85\u8865\u5145" aria-hidden="true">#</a> 8.\u66F4\u65B0\u540E\u5E38\u7528kafka \u547D\u4EE4(\u5F85\u8865\u5145)</h2><p>1.\u7ED9\u7528\u6237test\u6388\u4E88\u67D0\u4E2Atopic\u7684\u8BFB\u5199\u7684\u6743\u9650</p><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code><span class="token function">sh</span> bin/kafka-acls.sh --authorizer-properties zookeeper.connect<span class="token operator">=</span>localhost:2182 --add --allow-principal User:test --operationRead --operationWrite --topic <span class="token builtin class-name">test</span> --group<span class="token operator">=</span>*
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><blockquote><p>\u8BF4\u660E\uFF1A \u63A7\u5236\u8BFB\u5199\uFF1A\u2013operationRead\u2013operationWrite \u63A7\u5236\u6D88\u8D39\u7EC4\uFF1A\u4E0D\u63A7\u5236\u7EC4 --group=*\uFF0C\u6307\u5B9A\u6D88\u8D39\u7EC4 --grouptest-comsumer-group</p></blockquote><p>2.\u79FB\u9664\u6743\u9650 \u6267\u884C</p><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code><span class="token function">sh</span> bin/kafka-acls.sh --authorizer-properties zookeeper.connect<span class="token operator">=</span>localhost:2182 --remove --allow-principal User:test --allow-host <span class="token number">192.168</span>.1.101 --operationRead --operationWrite --topic <span class="token builtin class-name">test</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><p>3.\u5217\u51FAtopic\u4E3Atest\u7684\u6240\u6709\u6743\u9650\u8D26\u6237 \u6267\u884C</p><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code><span class="token function">sh</span> bin/kafka-acls.sh --authorizer-properties zookeeper.connect<span class="token operator">=</span>localhost:2182 --list --topic <span class="token builtin class-name">test</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><p>4.\u6D4B\u8BD5\u542F\u52A8\u6D88\u8D39\u8005 \u6267\u884C</p><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code><span class="token function">sh</span> bin/kafka-console-consumer.sh --bootstrap-server <span class="token number">127.0</span>.0.1:9092 --topic <span class="token builtin class-name">test</span> --from-beginning --consumer.config config/consumer.properties
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><p>5.\u6D4B\u8BD5\u542F\u52A8\u751F\u4EA7\u8005 \u6267\u884C</p><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code><span class="token function">sh</span> bin/kafka-console-producer.sh --broker-list <span class="token number">127.0</span>.0.1:9092 --topic <span class="token builtin class-name">test</span> --producer.config config/producer.properties
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><p>6.\u67E5\u770Btopic\u5217\u8868</p><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code><span class="token function">sh</span> bin/kafka-topics.sh --list --zookeeper localhost:2182 
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div>`,58);function l(p,o){return e}var t=n(s,[["render",l]]);export{t as default};

---
id: cdn
title: Content Delivery Network (CDN)
excerpt: 'CDN is a network of distributed servers used to deliver content faster'
category: Introduction
sidebar_label: Content Delivery Network (CDN)
---

It’s a network of servers that are distributed geographically and deliver content at fast speeds. It gives quick transfer of static content like files(HTML, js, text, etc.), images, and videos.
CDN plays a vital role in designing modern web applications and serves a majority of web traffic in recent times for sites like Instagram, Twitter, Netflix, Amazon, and many more.

Popular CDN offerings include Cloudflare, Akamai, and AWS Cloudfront.

## Working of CDN

When the user requests a webpage or any other content, the content will be delivered from a CDN server close to the user. The more the distance from the CDN server the more time content will take to reach the user and the slower will be load time for the content.

If the content is not available on the CDN, it can be fetched from the backend servers. Content on the CDN can have an expiry set by the application or configuration.  When the particular content is requested, it is returned with a TTL (time-to-live) header providing the value of expiry.

![CDN](/img/cdn/cdn.jpg)


For example, if you are located in Asia, data fetched from a server in Europe will take more time than the same data fetched from a server in Asia itself due to the distance the data has to travel.

Similar to static content delivery, nowadays CDNs are also capable of serving dynamic content. To generate the dynamic content, scripts are run at the CDN server rather than the backend server,  these scripts generate the content based on some variables and events like time, location, or input data from APIs and cache the content. For example, Cloudflare Workers offer Serverless Javascript functions that are executed on the Cloudflare CDN.

## Advantages of using CDN

- **Faster Load times** - Since files are fetched from a server closer to the user, load times are drastically improved. This leads to a better user experience overall, which in turn increases user engagement and reduces bounce rates. 

- **Reduced Infrastructure cost** - Since the request does not receive the backend servers, it decreases the load on the servers, hence reducing the infrastructure cost.

- **Increased Efficiency** - By using the techniques like minification and file compression, CDNs reduce the size of files that are transferred to the client. CDN can speed up the TLS/SSL-based sites by connection reuse and TLS false start.

- **Security** -  If configured correctly, CDN might help in mitigating security issues like DDoS attacks.


Though there are so many advantages of using CDN, we need to be careful while using a CDN and configuring it. Here are some of the aspects we should keep in mind.
	
- **Need** - Do we need a CDN?, In case our content is not accessed frequently or refreshed too quickly, then CDN might not be of any use.

- **Cost** - The major CDN providers mentioned in the Introduction section have pricing based on the number of requests or the amount of data in/out. Hence we should be careful about the cost to prevent massive billings.

- **Fallback** - Clients should be coded in such a way that if CDN is not available, they should be able to connect to backend servers for the content.

- **Cache Expiry** - We should be mindful while setting the expiry for the content, Have too long of expiry, the content might be stale. Have too short of Expiry and there might be unnecessary reloading of the content from the origin servers to the CDN.


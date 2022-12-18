---
id: messaging-system
title: Messaging System
category: 'Introduction'
sidebar_label: Messaging System
---

Messaging System is a common approach to transfer data between systems and applications. A producer generates a message containing some information that is transmitted to the consumers.

We can do this via direct communication via TCP connection between producer and consumer. However, such a system allows communication between exactly one producer and one consumer. Also what happens if producers are producing messages faster than the consumers can consume, And what happens if consumer nodes go down?

Depending upon the application, a popular way to send a message is via a message broker or a queue.

## Message Brokers

![Messaging System](/img/messaging-system/messaging-system.png)

Message brokers (or Queues) run as servers sitting between producers and consumers. Producers can produce messages to the message broker. On the other hand, consumers can receive messages from the broker. Thus it helps to decouple different interacting systems providing them an asynchronous way of messaging.

One or more producers can communicate with one or more consumers using such messaging systems.

Producers can now produce data at any rate without worrying about the rate at how data is consumed or who is consuming the data.

These systems can tolerate consumers going down and coming back and messages can be persisted in the broker from the time they are produced by the producers till the time they are consumed or even later depending upon the implementation.


## Messaging Patterns

Two common ways of handling the Messages are **Load balancing** and **Fan-out**

### Load Balancing 

Each message in the queue is delivered to exactly one of the consumers. In general, multiple consumers will be present in the system parallelizing the processing of the messages from the queue. Once the message is extracted by the consumer, it is removed from the queue. This pattern is generally used to process messages that result in long-running tasks and you want to achieve some parallel processing.

![Load Balancing](/img/messaging-system/messaging-system-loadbalancing.png)


 For example, Your credit card company generates a statement of transactions at the end of the billing cycle and sends an email with the statement. Such a system can be implemented by a scheduler that fetches user information from the DB and generates a message in the queue for processing data for each customer. A separate application receives this information, fetches data about the user transactions, crunches numbers, generates the statement, and delivers the email in our inbox.



## Fan-out

Each message in the broker is delivered to all the consumers, allowing multiple consumers to listen to the same message and perform different tasks. This pattern is used to process messages that have to be handled in multiple ways by different systems.

![Fan-out](/img/messaging-system/messaging-system-fan-out.png)

For example: While logging in to some applications, we receive the same passcode via text and email. Such a system can be implemented by sending all passcode messages through a messaging system and having **Text messaging application** and **Email messaging application** listen to the same message.

## Hybrid

We can combine the two patterns by using two consumer groups ( containing multiple consumers) listening to the same messages, such that each consumer group receives all messages but within a consumer group only one of the nodes receives each message. Kafka uses such an implementation.

## Benefits of using a Messaging System: 
Buffering: Messaging Systems provide a way to buffer the messages, persisting them in the broker (in memory or disc) while they wait to be processed by the consumers. Allowing our systems to deal with sudden traffic spikes up to some extent.
Message Delivery Guarantees: Using techniques described above messages are guaranteed to be delivered and processed by the consumers before they are marked as processed allowing retries in failure scenarios.
Easy Scaling: Because of the asynchronous nature of messaging systems and fault tolerance and configurability, it is rather easy to scale software systems that use messaging systems for communication, allowing multiple producers to communicate with multiple consumers.
Separation of concerns: Using a messaging system allows us flexibility in architecture by making the producers and consumers independent.

## Consideration while using a Messaging System:


### Back Pressure.
What happens if our system is under heavy sustained load, There are large amounts of messages flowing into the broker and it starts to grow significantly. Depending upon the server configuration, if the size becomes larger than the memory, it will result in cache misses and expensive disk reads. Having the entire system degrade under such circumstances is not the way to build scalable and fault-tolerant systems. Hence if the arrival rate is more than what the system can cope up with, can use backpressure in such scenarios by helping limit the queue size preventing throughput degradation, and maintaining good response times for the message processing. Once the broker gets filled, it can return a **service unavailable** using the HTTP status code 503, indicating to try at a later time.

Here is an interesting read on the this topic : 

[Apply back pressure](https://mechanical-sympathy.blogspot.com/2012/05/apply-back-pressure-when-overloaded.html)


### Acknowledgement and redelivery
If consumers crash while processing a message, which may result in loss of message. However, message brokers implement acknowledgments wherein the consumer must assure the message broker that it has completed processing the message and that broker can mark it as consumed and remove it from the queue. 

If the broker does not receive the acknowledgment, it will assume that the message did not get processed successfully and it will redeliver the message again until it is processed with an acknowledgment. We will learn more about this when we discuss implementations of different messaging systems like Kafka, RabbitMQ, etc.


	


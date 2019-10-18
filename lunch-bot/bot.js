// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

const { ActivityHandler, TurnContext } = require('botbuilder');

class MyBot extends ActivityHandler {
    constructor(conversationReferences) {
        super();

        setInterval(this.openRequest, 5000);

        this.conversationReferences = conversationReferences;

        this.onConversationUpdate(async (context, next) => {
            this.addConversationReference(context.activity);

            await next();
        });

        // See https://aka.ms/about-bot-activity-message to learn more about the message and other activity types.
        this.onMessage(async (context, next) => {
            await context.sendActivity(`you sent '${ context.activity.text }'`);
            // By calling next() you ensure that the next BotHandler is run.
            await next();
        });

        this.onMembersAdded(async (context, next) => {
            const membersAdded = context.activity.membersAdded;
            for (let cnt = 0; cnt < membersAdded.length; ++cnt) {
                if (membersAdded[cnt].id !== context.activity.recipient.id) {
                    await context.sendActivity('Hello and welcome!');
                }
            }
            // By calling next() you ensure that the next BotHandler is run.
            await next();
        });

        this.onMembersRemoved(async (context, next) => {
            const membersRemoved = context.activity.membersRemoved;
            for (let cnt = 0; cnt < membersRemoved.length; ++cnt) {
                if (membersRemoved[cnt].id !== context.activity.recipient.id) {
                    await context.sendActivity('Bbye!! Hope you had fun here!!');
                }
            }
            // By calling next() you ensure that the next BotHandler is run.
            await next();
        });

        this.onEvent
    }

    addConversationReference(activity) {
        const conversationReference = TurnContext.getConversationReference(activity);
        this.conversationReferences[conversationReference.conversation.id] = conversationReference;
    }

openRequest()
{
    var date = new Date();

    if (date.getHours() === 11 && date.getMinutes() === 30 && date.getSeconds() <= 10)
    {
        var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

var request = new XMLHttpRequest(); // Open a new connection, using the GET request on the URL endpoint 
request.open('GET', 'http://localhost:3978/api/notify', true);
request.send();
   }

    


}

}

module.exports.MyBot = MyBot;
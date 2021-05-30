using System;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.SignalR;
using SignalR_Angular.EFModels;

namespace SignalR_Angular.HubConfig
{
    public class MyHub: Hub
    {
        private readonly SignalRContext context;

        public MyHub(SignalRContext context)
        {
            this.context = context;
        }
        
        public async Task AskServer(string textFromClient)
        {
            var output = textFromClient == "hey" ? "message was \"hey\"" : "message was something else";
            await Clients.All.SendAsync("askServerResponse",output);
        }

        public async Task AuthMe(PersonInfo personInfo)
        {
            string currSignalId = Context.ConnectionId;
            Person tempPerson =
                context.Person.SingleOrDefault(p => p.Username == personInfo.Username && p.Password == personInfo.Password);
            if (tempPerson != null)
            {
                Console.WriteLine("\n" + tempPerson.Name + " logged in " + "\nSignalRId: ", currSignalId);
                Connections currUser = new Connections()
                {
                    PersionId = tempPerson.Id,
                    SignalrId = currSignalId,
                    TimeStamp = DateTime.Now
                };
                if (context.Connections.SingleOrDefault(c => c.PersionId == tempPerson.Id) == null)
                    await context.AddAsync(currUser);
                await context.SaveChangesAsync();
                await Clients.Caller.SendAsync("authMeResponseSuccess", tempPerson);
            }
            else
            {
                await Clients.Client(currSignalId).SendAsync("authMeResponseFail");
            }
        }
    }

    public class PersonInfo
    {
        public string Username { get; set; }
        public string Password { get; set; }
    }
}
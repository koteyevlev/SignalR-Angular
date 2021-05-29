using System;
using System.Collections.Generic;

#nullable disable

namespace SignalR_Angular.EFModels
{
    public partial class Person
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Username { get; set; }
        public string Password { get; set; }
    }
}

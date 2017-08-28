namespace contacts_app.Models
{
    public class Event
    {
        public Event()
        {}

        public Event(string type, string targetId)
        {
            Type = type;
            TargetId = targetId;
        }

        public string Type { get; }
        public string TargetId { get; }
    }
}

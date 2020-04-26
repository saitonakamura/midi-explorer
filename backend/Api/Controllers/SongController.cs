using Microsoft.AspNetCore.Mvc;
using Core;

namespace Api
{
    [ApiController]
    [Route("song")]
    public class SongController : ControllerBase
    {
        [HttpPost]
        [Route("process")]
        public ActionResult<Song> Process()
        {
            return Ok(new Song());
        }
    }
}
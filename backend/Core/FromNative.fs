namespace MidiExplorer.Core

open MidiExplorer.GuitarPro
open MidiExplorer.Core.Types

module FromNative =
    let toMessage (nativeNote: NativeNote): Message = { Note = nativeNote.fret }

    let toTrack (nativeTrack: NativeTrack): Track =
        { Name = nativeTrack.name
          Messages = Seq.map toMessage nativeTrack.notes |> Seq.toList }

    let toSong (nativeSong: NativeFormat): Song =
        { Title = nativeSong.title
          Artist = nativeSong.artist
          Tracks = Seq.map toTrack nativeSong.tracks |> Seq.toList }

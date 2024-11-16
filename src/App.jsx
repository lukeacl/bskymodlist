import { createSignal, createEffect, onMount, For } from "solid-js";

function App() {
  const [data, setData] = createSignal({});

  const fetchData = async () => {
    try {
      const result = await fetch("https://api.skymodlist.com");
      const json = await result.json();
      setData(json);
    } catch (error) {
      console.log(error);
    }
  };

  //bump

  onMount(async () => {
    setInterval(async () => {
      await fetch();
    }, 60000);
    await fetchData();
  });

  return (
    <>
      <div class="flex flex-col items-center px-5 py-5">
        <h1 class="text-3xl font-semibold mb-4">Skymodlist</h1>
        <p class="text-xl text-center mb-2">
          This is a top 100 list of known moderation lists on the Bluesky
          network sorted by popularity.
        </p>
        <p class="mb-2 text-center font-bold">Important Note</p>
        <p class="mb-2 text-center bg-sky-100 px-3 py-3">
          Before subscribing (to mute/block) to any moderation list you must
          ensure that you trust the publisher (user) first. Every publisher will
          have their own bias and criteria that may not align with yours. Review
          their list and their profile first to make an informed decision.
        </p>
        <p class="mb-2 text-center text-xs">
          Click on any title to view the moderation list on Bluesky.
        </p>
        <p class="mb-2 text-center text-xs">
          Click on any handle to view the user (publisher) on Bluesky.
        </p>
        <p class="mb-4 text-center">
          <a href="https://bsky.app/profile/lukeacl.com" target="_blank">
            💕 @lukeacl.com
          </a>
        </p>
        <table class="bg-gray-100">
          <thead></thead>
          <tbody>
            <For each={data()}>
              {(list, i) => (
                <>
                  <tr classList={{ "bg-gray-300": i() % 2 }}>
                    <td class="px-2 pt-5 text-xl mb-3">
                      <a
                        href={`https://bsky.app/profile/${list.record.uri.split("/")[2]}/lists/${list.record.uri.split("/")[4]}`}
                        target="_blank"
                      >
                        <strong>{list.record.name}</strong>{" "}
                        <em class="text-xs">
                          ({list.record.listItemCount.toLocaleString()} Account
                          {list.record.listItemCount != 1 ? "s" : ""})
                        </em>
                      </a>
                    </td>
                  </tr>
                  <tr classList={{ "bg-gray-300": i() % 2 }}>
                    <td class="px-2 text-sm">{list.record.description}</td>
                  </tr>
                  <tr classList={{ "bg-gray-300": i() % 2 }}>
                    <td class="px-2 text-xs">
                      <a
                        href={`https://bsky.app/profile/${list.record.creator.handle}`}
                        target="_blank"
                      >
                        @{list.record.creator.handle}
                      </a>
                    </td>
                  </tr>
                  <tr classList={{ "bg-gray-300": i() % 2 }}>
                    <td class="px-2 text-xs pb-5">
                      {list.hits.toLocaleString()} Hit
                      {list.hits != 1 ? "s" : ""}
                    </td>
                  </tr>
                </>
              )}
            </For>
          </tbody>
        </table>
      </div>
    </>
  );
}

export default App;

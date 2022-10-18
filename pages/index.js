import Head from "next/head";
import Image from "next/image";
import { useEffect, useState } from "react";
import styles from "../styles/Home.module.css";
import axios from "axios";

export default function Home() {
  const [streamers, setStreamers] = useState([]);
  const [matches, setMatches] = useState([]);

  const getStreamers = () => {
    axios.get("/api/streamers").then((res) => {
      setStreamers(res.data.results);
    });
  };

  const getMatches = () => {
    axios.get("/api/matches/all").then((res) => {
      setMatches(res.data.payload);
    });
  };

  const verifyStream = (player) => {
    const playerStreaming = streamers.filter((stream) => {
      return stream.profile.id == player.id;
    });

    return playerStreaming[0];
  };

  const verifyResult = (score1, score2) => {
    if (score1 == score2) {
      return "stat-value text-gray-400 text-4xl";
    } else if (score1 > score2) {
      return "stat-value text-green-500 text-4xl";
    }

    return "stat-value text-red-500 text-4xl";
  };
  useEffect(() => {
    getMatches();
    getStreamers();
  }, []);

  return (
    <div className={styles.container}>
      <Head>
        <title>FPL Live Matches</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="preconnect" href="https://fonts.googleapis.com"></link>
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossorigin
        ></link>
        <link
          href="https://fonts.googleapis.com/css2?family=Play:wght@400;700&display=swap"
          rel="stylesheet"
        ></link>
        <link rel="preconnect" href="https://fonts.googleapis.com"></link>
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin></link>
        <link href="https://fonts.googleapis.com/css2?family=Red+Hat+Display:wght@300;400;500;600;700&display=swap" rel="stylesheet"></link>
      </Head>

      <main className={styles.main}>
        <h1 className="text-4xl font-play font-bold mb-2">
          FPL CSGO South America
        </h1>
        <div className="badge badge-accent font-bold font-play bg-orange-600 border-orange-600 mb-8">
          LIVE MATCHES
        </div>
        <div className="w-full gap-8 items-center flex flex-col">
          {matches.map((match) => {
            return (
              <div key={match.id} className="p-4 px-8 pb-8 rounded-2xl max-w-4xl w-full bg-card border-orange-600">
                <div className="flex justify-center mb-8 w-full gap-8">
                  <h2 className="mr-auto flex items-center font-red-hat text-2xl gap-2 text-white font-medium">
                    {match.teams.faction1.name}
                  </h2>
                  <div
                    className={verifyResult(
                      match.summaryResults?.factions.faction1.score,
                      match.summaryResults?.factions.faction2.score
                    )}
                  >
                    {match.summaryResults?.factions.faction1.score}
                  </div>
                  <div
                    className={verifyResult(
                      match.summaryResults?.factions.faction2.score,
                      match.summaryResults?.factions.faction1.score
                    )}
                  >
                    {match.summaryResults?.factions.faction2.score}
                  </div>
                  <h2 className="ml-auto flex text-2xl font-red-hat items-center gap-2 text-white font-medium">
                    {match.teams.faction2.name}
                  </h2>
                </div>
                <div className="flex justify-between">
                  <div className="flex flex-col gap-4">
                    {match.teams.faction1.roster.map((player) => {
                      return (
                        <div key={player.id} className="flex gap-2 items-center">
                          <div class="avatar">
                            <div class="w-8 h-fit rounded-full">
                              <img src={player.avatar} />
                            </div>
                          </div>
                          <div className="flex flex-col font-play text-gray-400 font-bold text-base">
                            {player.nickname}
                            {verifyStream(player) ? (
                              <a
                                className="flex items-center"
                                href={verifyStream(player).stream.channel_url}
                              >
                                <img
                                  className="h-4"
                                  src="/twitch-app-logo-png-3.png"
                                ></img>
                                <span className="font-medium text-purple-500">
                                  {verifyStream(player).stream.channel_name}
                                </span>
                              </a>
                            ) : (
                              ""
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                  <div className="flex flex-col gap-4 items-end">
                    {match.teams.faction2.roster.map((player) => {
                      return (
                        <div key={player.id} className="flex gap-2 items-center">
                          <div className="flex flex-col font-play text-gray-400 font-bold text-base">
                            {player.nickname}
                            {verifyStream(player) ? (
                              <a
                                className="flex items-center"
                                href={verifyStream(player).stream.channel_url}
                              >
                                <img
                                  className="h-4"
                                  src="/twitch-app-logo-png-3.png"
                                ></img>
                                <span className="font-medium text-purple-500">
                                  {verifyStream(player).stream.channel_name}
                                </span>
                              </a>
                            ) : (
                              ""
                            )}
                          </div>
                          <div class="avatar">
                            <div class="w-8 h-fit rounded-full">
                              <img src={player.avatar}/>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </main>

      <footer className={styles.footer}>
        <a
          href="https://twitter.com/crazynnconrad"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by Crazynn
        </a>
      </footer>
    </div>
  );
}
import { useEffect, useState } from 'react';
import { fetchAuthSession } from 'aws-amplify/auth';
import { useAuthenticator } from '@aws-amplify/ui-react';

type HealthSnapshot = {
  userID: string;
  heartRate: number;
  oxygenLevel: number;
  timestamp: string;
};

export default function VitalsCard() {
  const { user } = useAuthenticator();
  const [latestSnapshot, setLatestSnapshot] = useState<HealthSnapshot | null>(null);

  async function getAuthToken() {
    const session = await fetchAuthSession();
    const idToken = session.tokens?.idToken?.toString();
    return idToken;
  }

  useEffect(() => {
    if (!user) return;

    async function fetchVitals() {
      try {
        const idToken = await getAuthToken();
        const url = `https://lesiun05ul.execute-api.us-east-1.amazonaws.com/demo/getLatestVitals?userID=${encodeURIComponent(user.signInDetails?.loginId ?? "")}`;
        const res = await fetch(url, {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${idToken}`,
          },
        });

        if (!res.ok) {
          const errorText = await res.text();
          throw new Error(`HTTP ${res.status}: ${errorText}`);
        }

        const data = await res.json();
        setLatestSnapshot(data);
      } catch (err) {
        console.error("Error fetching vitals:", err);
      }
    }

    fetchVitals();
  }, [user]);

  if (!latestSnapshot) {
    return <p className="text-white">Loading latest vitals...</p>;
  }

  return (
    <div className="bg-gray-800 rounded-lg p-4 shadow-md text-white">
      <h2 className="text-lg font-semibold mb-2">Latest Vitals</h2>
      <p>Heart Rate: {latestSnapshot.heartRate}</p>
      <p>Oxygen Level: {latestSnapshot.oxygenLevel}</p>
      <p>Timestamp: {new Date(Number(latestSnapshot.timestamp)).toLocaleString()}</p>
    </div>
  );
}

using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class Spawner : MonoBehaviour
{
    [SerializeField] private GameObject enemyPrefab;
    [SerializeField] private Transform[] spawnPoints;
    [SerializeField] private int enemiesPerWave, waves;
    [SerializeField] private float timeBetweenSpawns, timeBetweenWaves;
    void Start()
    {
        StartCoroutine(Spawn());
    }



    private IEnumerator Spawn()
    {
        for(int i = 0; i < waves; i++)
        {
            for (int j = 0; j < enemiesPerWave; j++)
            {
                yield return new WaitForSeconds(timeBetweenSpawns);
                int randomIndex = Random.Range(0, spawnPoints.Length);
                Instantiate(enemyPrefab, spawnPoints[randomIndex].position, Quaternion.identity);
            }
            yield return new WaitForSeconds(timeBetweenWaves);
        }
        
        
    }
}

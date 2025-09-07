using UnityEngine;
using UnityEngine.UI;

public class HealthBar : MonoBehaviour
{
    [SerializeField] private Image healthbar;

    public void UpdateHealthBar(int maxHealth, int health)
    {
        healthbar.fillAmount = (float)health / maxHealth;
    }
}

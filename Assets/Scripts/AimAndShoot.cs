using UnityEngine;

public class AimAndShoot : MonoBehaviour
{
    [SerializeField] private Transform playerTransform;
    [SerializeField] private float aimSpeed;

    private Camera cam;
    private Vector2 mouseWorldPosition;

    void Start()
    {
        cam = Camera.main;
    }

    void Update()
    {
        transform.position = playerTransform.position;
        mouseWorldPosition = cam.ScreenToWorldPoint(Input.mousePosition);
        Vector2 direction = mouseWorldPosition - (Vector2)transform.position;
        transform.right = Vector2.MoveTowards(transform.right, direction, aimSpeed * Time.deltaTime);

    }
}
